import * as XLSX from "xlsx";
import * as fs from "fs";
import * as path from "path";

/**
 * Sample knowledge base for Kenmark ITan Solutions
 * Based on typical IT consulting company structure
 */
const knowledgeData = [
  {
    Category: "About",
    Question: "What is Kenmark ITan Solutions?",
    Answer: "Kenmark ITan Solutions is a technology consulting company specializing in AI solutions, digital transformation, cloud services, and IT training. We help businesses leverage cutting-edge technology to drive growth and innovation.",
  },
  {
    Category: "About",
    Question: "When was Kenmark ITan Solutions founded?",
    Answer: "Kenmark ITan Solutions has been serving clients with innovative technology solutions, focusing on delivering excellence in AI, cloud computing, and enterprise software development.",
  },
  {
    Category: "About",
    Question: "What is the company mission?",
    Answer: "Our mission is to empower businesses through innovative technology solutions, delivering excellence in consulting, development, and training while maintaining the highest standards of quality and customer satisfaction.",
  },
  {
    Category: "Services",
    Question: "What services does Kenmark ITan Solutions offer?",
    Answer: "We offer: 1) AI & Machine Learning Solutions, 2) Cloud Computing Services (AWS, Azure, GCP), 3) Software Development & Consulting, 4) Digital Transformation, 5) IT Training & Workshops, 6) Data Analytics & Business Intelligence, 7) Cybersecurity Solutions.",
  },
  {
    Category: "Services",
    Question: "Do you provide AI consulting services?",
    Answer: "Yes! We specialize in AI and Machine Learning solutions including: chatbots, predictive analytics, computer vision, natural language processing, recommendation systems, and custom AI model development. We help businesses integrate AI into their existing workflows.",
  },
  {
    Category: "Services",
    Question: "What cloud platforms do you work with?",
    Answer: "We have expertise in all major cloud platforms: Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP). We provide cloud migration, architecture design, optimization, and managed services.",
  },
  {
    Category: "Services",
    Question: "Do you offer software development services?",
    Answer: "Yes, we provide full-stack software development including web applications, mobile apps, enterprise software, API development, and custom solutions using modern technologies like React, Next.js, Node.js, Python, and more.",
  },
  {
    Category: "Services",
    Question: "What training programs are available?",
    Answer: "We offer corporate training programs in: Python Programming, AI/ML Fundamentals, Cloud Computing, Full-Stack Development, Data Science, Cybersecurity, and DevOps. Training can be customized for your team's needs and delivered onsite or remotely.",
  },
  {
    Category: "Contact",
    Question: "How can I contact Kenmark ITan Solutions?",
    Answer: "You can reach us through our website at https://kenmarkitan.com. Visit the Contact page for phone numbers, email addresses, and office locations. We typically respond within 24 hours.",
  },
  {
    Category: "Contact",
    Question: "Where is Kenmark ITan Solutions located?",
    Answer: "Please visit https://kenmarkitan.com/contact for our office locations and addresses. We serve clients globally and offer both remote and onsite services.",
  },
  {
    Category: "Contact",
    Question: "What are your business hours?",
    Answer: "We operate Monday through Friday, 9:00 AM to 6:00 PM. For urgent matters, please use the emergency contact information available on our website. We also offer 24/7 support for enterprise clients.",
  },
  {
    Category: "FAQ",
    Question: "How do I request a quote or proposal?",
    Answer: "Visit https://kenmarkitan.com/contact and fill out the project inquiry form with details about your needs. Our team will review your requirements and respond with a detailed proposal within 2-3 business days.",
  },
  {
    Category: "FAQ",
    Question: "What industries do you serve?",
    Answer: "We serve clients across multiple industries including: Healthcare, Finance & Banking, E-commerce, Manufacturing, Education, Retail, Logistics, and Technology startups. Our solutions are tailored to each industry's specific needs.",
  },
  {
    Category: "FAQ",
    Question: "Do you work with startups?",
    Answer: "Absolutely! We love working with startups and offer flexible engagement models. We provide MVP development, technical consulting, CTO-as-a-service, and can help you scale your technology infrastructure as you grow.",
  },
  {
    Category: "FAQ",
    Question: "What is your typical project timeline?",
    Answer: "Project timelines vary based on scope and complexity. Small projects: 2-4 weeks, Medium projects: 1-3 months, Large enterprise projects: 3-12 months. We provide detailed timelines during the proposal phase and maintain transparent communication throughout.",
  },
  {
    Category: "FAQ",
    Question: "Do you provide ongoing support and maintenance?",
    Answer: "Yes, we offer comprehensive support and maintenance packages including: bug fixes, updates, performance monitoring, security patches, and feature enhancements. Support plans can be customized based on your needs.",
  },
  {
    Category: "Technologies",
    Question: "What programming languages do you use?",
    Answer: "Our team is proficient in: Python, JavaScript/TypeScript, Java, C#, Go, PHP, and more. We choose the best technology stack based on your project requirements and long-term goals.",
  },
  {
    Category: "Technologies",
    Question: "What frameworks and tools do you work with?",
    Answer: "We work with modern frameworks including: React, Next.js, Angular, Vue.js, Node.js, Django, FastAPI, .NET, Spring Boot, TensorFlow, PyTorch, and many more. We stay current with the latest technologies and best practices.",
  },
];

/**
 * Generate Excel file with sample knowledge base
 */
function generateExcelFile() {
  // Create public/knowledge directory if it doesn't exist
  const knowledgeDir = path.join(process.cwd(), "public", "knowledge");
  if (!fs.existsSync(knowledgeDir)) {
    fs.mkdirSync(knowledgeDir, { recursive: true });
  }

  // Create workbook
  const worksheet = XLSX.utils.json_to_sheet(knowledgeData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Knowledge Base");

  // Set column widths
  worksheet["!cols"] = [
    { width: 15 },  // Category
    { width: 50 },  // Question
    { width: 80 },  // Answer
  ];

  // Write to file
  const filePath = path.join(knowledgeDir, "sample-faqs.xlsx");
  XLSX.writeFile(workbook, filePath);

  console.log(`✅ Excel file created successfully at: ${filePath}`);
  console.log(`   Total rows: ${knowledgeData.length}`);
  console.log(`   Categories: ${[...new Set(knowledgeData.map(d => d.Category))].join(", ")}`);
}

// Run if called directly
if (require.main === module) {
  generateExcelFile();
}

export { generateExcelFile, knowledgeData };
