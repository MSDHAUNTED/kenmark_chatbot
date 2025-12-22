const { PrismaClient } = require('./src/generated/prisma/client');
const XLSX = require('xlsx');

const prisma = new PrismaClient({ accelerateUrl: process.env.DATABASE_URL });

async function main() {
  try {
    console.log('Loading Excel file...');
    const workbook = XLSX.readFile('./public/knowledge/sample-faqs.xlsx');
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);
    
    console.log(`Found ${data.length} rows`);
    
    // Clear existing
    await prisma.knowledgeEntry.deleteMany({});
    console.log('Cleared existing entries');
    
    // Insert
    for (const row of data) {
      if (!row.Category || !row.Question || !row.Answer) continue;
      
      await prisma.knowledgeEntry.create({
        data: {
          category: row.Category,
          question: row.Question,
          answer: row.Answer,
          source: 'excel',
        },
      });
    }
    
    console.log('✅ Knowledge loaded!');
    await prisma.$disconnect();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
