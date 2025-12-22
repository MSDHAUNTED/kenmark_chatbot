import { NextRequest, NextResponse } from "next/server";
import { retrieveContext } from "@/lib/retrieval";
import { generateResponse } from "@/lib/llm";
import { prisma } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ChatRequest {
  message: string;
  sessionId?: string;
}

interface ChatResponse {
  reply: string;
  sources?: string[];
  error?: string;
}

/**
 * POST /api/chat
 * Main chatbot endpoint - handles RAG pipeline
 */
export async function POST(req: NextRequest): Promise<NextResponse<ChatResponse>> {
  try {
    const body: ChatRequest = await req.json();
    const { message, sessionId } = body;

    // Validate input
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { reply: "", error: "Message is required" },
        { status: 400 }
      );
    }

    const query = message.trim();
    
    // Basic rate limiting check (optional)
    if (query.length > 500) {
      return NextResponse.json(
        { reply: "Your message is too long. Please keep it under 500 characters.", error: "Message too long" },
        { status: 400 }
      );
    }

    console.log(`[Chat API] Query: "${query}"`);

    // Step 1: Retrieve relevant context from knowledge base
    const context = await retrieveContext(query, 5);
    console.log(`[Chat API] Retrieved ${context.length} context entries`);

    // Step 2: Generate AI response using RAG
    const reply = await generateResponse(context, query);
    console.log(`[Chat API] Generated response: "${reply.substring(0, 100)}..."`);

    // Step 3: Extract sources (categories)
    const sources = context.length > 0
      ? Array.from(new Set(context.map((ctx) => ctx.category)))
      : [];

    // Step 4: Optional - Log chat for analytics
    if (sessionId) {
      try {
        await prisma.chatLog.create({
          data: {
            sessionId,
            query,
            response: reply,
          },
        });
      } catch (logError) {
        console.error("Failed to log chat:", logError);
        // Don't fail the request if logging fails
      }
    }

    return NextResponse.json({
      reply,
      sources,
    });
  } catch (error) {
    console.error("[Chat API] Error:", error);
    
    return NextResponse.json(
      {
        reply: "I'm experiencing technical difficulties. Please try again in a moment.",
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/chat - Health check
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    status: "ok",
    message: "Chat API is running",
    timestamp: new Date().toISOString(),
  });
}
