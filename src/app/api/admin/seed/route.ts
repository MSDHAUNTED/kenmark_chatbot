import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/mongodb";

export const runtime = "nodejs";

/**
 * POST /api/admin/seed - Load sample knowledge
 */
export async function POST(req: NextRequest) {
  try {
    // Sample knowledge data
    const sampleData = [
      {
        category: "About",
        question: "What is Kenmark ITan Solutions?",
        answer: "Kenmark ITan Solutions is a technology consulting company specializing in AI solutions, digital transformation, cloud services, and IT training.",
        source: "manual",
      },
      {
        category: "Services",
        question: "What services does Kenmark ITan Solutions offer?",
        answer: "We offer AI & Machine Learning Solutions, Cloud Computing Services (AWS, Azure, GCP), Software Development & Consulting, Digital Transformation, IT Training & Workshops, Data Analytics, and Cybersecurity Solutions.",
        source: "manual",
      },
      {
        category: "Contact",
        question: "How can I contact Kenmark ITan Solutions?",
        answer: "You can reach us through our website at https://kenmarkitan.com. Visit the Contact page for phone numbers, email addresses, and office locations.",
        source: "manual",
      },
    ];

    // Clear existing
    const deleted = await prisma.knowledgeEntry.deleteMany({});
    console.log(`Deleted ${deleted.count} entries`);

    // Insert sample data
    for (const entry of sampleData) {
      await prisma.knowledgeEntry.create({ data: entry });
    }

    return NextResponse.json({
      success: true,
      message: `Loaded ${sampleData.length} knowledge entries`,
      count: sampleData.length,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
