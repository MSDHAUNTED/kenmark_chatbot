import Chatbot from "@/components/Chatbot";

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900">
        <main className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
              Kenmark ITan Solutions
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
              AI-Powered Chatbot Assistant
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              NMIMS Intern Technical Assignment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-3"></div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">AI-Powered</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Uses RAG with local LLM or free APIs
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-3"></div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Knowledge Base</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Answers from Excel FAQs and company info
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-3"></div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Smart Chat</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Session memory and typing indicators
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl max-w-2xl text-center">
            <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
              Try the Chatbot! 
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Click the chat button in the bottom-right corner to ask about Kenmark ITan services.
            </p>
          </div>

          <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>Built for NMIMS Internship Assignment</p>
            <p>By Gaurav Sonigra</p>
          </footer>
        </main>
      </div>

      <Chatbot />
    </>
  );
}
