import { RetrievedContext } from "./retrieval";

/**
 * System prompt that enforces RAG behavior and prevents hallucinations
 */
const SYSTEM_PROMPT = `You are an AI assistant for Kenmark ITan Solutions (https://kenmarkitan.com).

Your role is to answer questions about:
- Company information and history
- Services offered (consulting, AI solutions, training, etc.)
- Contact information
- General FAQs

CRITICAL RULES:
1. Answer ONLY using information from the provided context
2. If the context doesn't contain relevant information, respond with: "I don't have that information yet. Please visit our website at kenmarkitan.com or contact us directly."
3. Be professional, concise, and helpful
4. Never make up information or hallucinate
5. If asked about topics outside Kenmark ITan Solutions, politely redirect to company-related topics

When answering:
- Reference the specific category when relevant (e.g., "According to our Services...")
- Keep responses under 3-4 sentences unless more detail is needed
- Use a friendly, professional tone`;

interface LLMConfig {
  provider: "ollama" | "groq" | "openrouter";
  model?: string;
  apiKey?: string;
  baseURL?: string;
}

/**
 * Detect which LLM provider to use based on environment variables
 */
export function detectLLMProvider(): LLMConfig {
  // Check for Groq API key
  if (process.env.GROQ_API_KEY) {
    return {
      provider: "groq",
      apiKey: process.env.GROQ_API_KEY,
      model: process.env.GROQ_MODEL || "llama-3.1-70b-versatile",
      baseURL: "https://api.groq.com/openai/v1",
    };
  }

  // Check for OpenRouter API key
  if (process.env.OPENROUTER_API_KEY) {
    return {
      provider: "openrouter",
      apiKey: process.env.OPENROUTER_API_KEY,
      model: process.env.OPENROUTER_MODEL || "meta-llama/llama-3-8b-instruct:free",
      baseURL: "https://openrouter.ai/api/v1",
    };
  }

  // Default to Ollama (local)
  return {
    provider: "ollama",
    model: process.env.OLLAMA_MODEL || "llama2",
    baseURL: process.env.OLLAMA_URL || "http://localhost:11434/v1",
  };
}

/**
 * Generate AI response using RAG (Retrieval-Augmented Generation)
 */
export async function generateResponse(
  context: RetrievedContext[],
  query: string
): Promise<string> {
  const config = detectLLMProvider();

  // If no relevant context found, return default message
  if (context.length === 0) {
    return "I don't have that information yet. Please visit our website at kenmarkitan.com or contact us directly for more details.";
  }

  // Format context for the prompt
  const contextText = context
    .map(
      (ctx, idx) =>
        `[Context ${idx + 1}] Category: ${ctx.category}\nQ: ${ctx.question}\nA: ${ctx.answer}`
    )
    .join("\n\n");

  const userPrompt = `Based on the following information about Kenmark ITan Solutions, please answer the user's question.

${contextText}

User Question: ${query}

Answer:`;

  try {
    // Use OpenAI SDK (compatible with Ollama, Groq, OpenRouter via baseURL)
    const { OpenAI } = await import("openai");
    
    const client = new OpenAI({
      apiKey: config.apiKey || "ollama", // Ollama doesn't need real API key
      baseURL: config.baseURL,
    });

    const response = await client.chat.completions.create({
      model: config.model!,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const answer = response.choices[0]?.message?.content?.trim();
    
    if (!answer) {
      throw new Error("Empty response from LLM");
    }

    return answer;
  } catch (error) {
    console.error("Error generating LLM response:", error);
    
    // Fallback: return the most relevant context directly
    if (context.length > 0) {
      return `Based on our information: ${context[0].answer}\n\nFor more details, please visit kenmarkitan.com`;
    }
    
    return "I'm having trouble generating a response right now. Please try again or visit kenmarkitan.com for more information.";
  }
}

/**
 * Test LLM connection
 */
export async function testLLMConnection(): Promise<boolean> {
  try {
    const config = detectLLMProvider();
    console.log(`Testing LLM connection (${config.provider})...`);
    
    const testContext: RetrievedContext[] = [
      {
        category: "Test",
        question: "What is 2+2?",
        answer: "2+2 equals 4",
      },
    ];

    const response = await generateResponse(testContext, "What is 2+2?");
    console.log("✅ LLM connection successful");
    console.log("Test response:", response);
    return true;
  } catch (error) {
    console.error("❌ LLM connection failed:", error);
    return false;
  }
}
