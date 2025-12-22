const { PrismaClient } = require(require('path').join(__dirname, '..', 'src', 'generated', 'prisma', 'client.ts'));
const XLSX = require('xlsx');
const path = require('path');

const prisma = new PrismaClient();

async function loadKnowledge() {
  try {
    console.log('Loading knowledge from Excel...');
    
    const excelPath = path.join(__dirname, '..', 'public', 'knowledge', 'sample-faqs.xlsx');
    const workbook = XLSX.readFile(excelPath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    console.log(`Found ${data.length} rows`);

    // Clear existing
    const deleted = await prisma.knowledgeEntry.deleteMany({});
    console.log(`Deleted ${deleted.count} existing entries`);

    // Insert new
    let count = 0;
    for (const row of data) {
      if (!row.Category || !row.Question || !row.Answer) continue;
      
      await prisma.knowledgeEntry.create({
        data: {
          category: row.Category.trim(),
          question: row.Question.trim(),
          answer: row.Answer.trim(),
          source: 'excel',
        },
      });
      count++;
    }

    console.log(`✅ Successfully inserted ${count} knowledge entries`);
    await prisma.$disconnect();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

loadKnowledge();
