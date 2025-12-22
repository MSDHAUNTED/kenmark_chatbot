import { prisma } from "./mongodb";

export interface RetrievedContext {
  category: string;
  question: string;
  answer: string;
  relevanceScore?: number;
}

/**
 * Retrieve relevant knowledge entries from MongoDB based on user query
 * Uses simple keyword matching - can be enhanced with vector similarity
 */
export async function retrieveContext(
  query: string,
  limit: number = 5
): Promise<RetrievedContext[]> {
  try {
    const normalizedQuery = query.toLowerCase().trim();
    
    // Extract key terms (remove common words)
    const stopWords = ["what", "is", "are", "the", "a", "an", "how", "can", "do", "does"];
    const keywords = normalizedQuery
      .split(/\s+/)
      .filter((word) => word.length > 2 && !stopWords.includes(word));

    if (keywords.length === 0) {
      // Fallback: return general entries
      const entries = await prisma.knowledgeEntry.findMany({
        take: 3,
        orderBy: { createdAt: "desc" },
      });
      
      return entries.map((entry) => ({
        category: entry.category,
        question: entry.question,
        answer: entry.answer,
      }));
    }

    // Search across category, question, and answer fields
    const allEntries = await prisma.knowledgeEntry.findMany();

    // Score each entry based on keyword matches
    const scoredEntries = allEntries
      .map((entry) => {
        const searchText = `${entry.category} ${entry.question} ${entry.answer}`.toLowerCase();
        
        let score = 0;
        keywords.forEach((keyword) => {
          const regex = new RegExp(keyword, "gi");
          const matches = searchText.match(regex);
          if (matches) {
            score += matches.length;
          }
        });

        return {
          ...entry,
          relevanceScore: score,
        };
      })
      .filter((entry) => entry.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit);

    return scoredEntries.map((entry) => ({
      category: entry.category,
      question: entry.question,
      answer: entry.answer,
      relevanceScore: entry.relevanceScore,
    }));
  } catch (error) {
    console.error("Error retrieving context:", error);
    return [];
  }
}

/**
 * Check if the query is within scope (related to Kenmark ITan Solutions)
 */
export function isQueryInScope(query: string): boolean {
  const lowerQuery = query.toLowerCase();
  
  // Keywords that suggest query is about the company
  const scopeKeywords = [
    "kenmark", "itan", "company", "service", "contact", "about",
    "team", "portfolio", "solution", "training", "consulting"
  ];
  
  const hasScope = scopeKeywords.some((keyword) => lowerQuery.includes(keyword));
  
  // If no scope keywords, assume it's a general question that might be answered
  // from FAQ or services
  return true; // Let retrieval decide if we have relevant info
}
