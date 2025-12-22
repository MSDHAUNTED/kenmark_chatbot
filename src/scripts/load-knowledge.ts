import * as XLSX from "xlsx";
import { prisma } from "../lib/mongodb";
import path from "path";
import fs from "fs";

interface ExcelRow {
  Category: string;
  Question: string;
  Answer: string;
}

/**
 * Load knowledge from Excel file into MongoDB
 */
export async function loadKnowledgeFromExcel(filePath: string): Promise<number> {
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`Excel file not found: ${filePath}`);
    }

    // Read Excel file
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert to JSON
    const data: ExcelRow[] = XLSX.utils.sheet_to_json(worksheet);

    console.log(`Found ${data.length} rows in Excel file`);

    // Clear existing entries (optional - comment out to preserve data)
    const deleteCount = await prisma.knowledgeEntry.deleteMany({});
    console.log(`Deleted ${deleteCount.count} existing entries`);

    // Insert new entries
    let insertedCount = 0;
    for (const row of data) {
      // Skip empty rows
      if (!row.Category || !row.Question || !row.Answer) {
        continue;
      }

      await prisma.knowledgeEntry.create({
        data: {
          category: row.Category.trim(),
          question: row.Question.trim(),
          answer: row.Answer.trim(),
          source: "excel",
        },
      });

      insertedCount++;
    }

    console.log(`✅ Successfully inserted ${insertedCount} knowledge entries`);
    return insertedCount;
  } catch (error) {
    console.error("Error loading knowledge from Excel:", error);
    throw error;
  }
}

/**
 * Main execution
 */
async function main() {
  const excelPath = path.join(process.cwd(), "public", "knowledge", "sample-faqs.xlsx");
  
  console.log("Loading knowledge base from Excel...");
  console.log(`File path: ${excelPath}`);

  const count = await loadKnowledgeFromExcel(excelPath);
  console.log(`\n✅ Knowledge base loaded successfully!`);
  console.log(`Total entries: ${count}`);

  await prisma.$disconnect();
}

// Run if called directly
if (require.main === module) {
  main()
    .catch((error) => {
      console.error("Fatal error:", error);
      process.exit(1);
    });
}
