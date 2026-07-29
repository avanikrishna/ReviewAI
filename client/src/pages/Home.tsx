import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 py-24">
        <span className="bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full mb-8">
          AI Powered Developer Tool
        </span>

        <h1 className="text-6xl font-bold max-w-5xl leading-tight">
          AI-Powered Code Review Assistant
        </h1>

        <p className="text-slate-400 text-xl max-w-3xl mt-8 leading-8">
          Review Java, Python, JavaScript, TypeScript, C++, C and more using
          intelligent AI that detects bugs, improves quality and explains your
          code.
        </p>

        <div className="flex gap-5 mt-12">
          <button
            onClick={() => navigate("/review")}
            className="bg-blue-600 hover:bg-blue-700 transition px-8 py-4 rounded-xl text-lg"
          >
            Start Reviewing
          </button>

          <button className="border border-slate-700 hover:border-slate-500 transition px-8 py-4 rounded-xl text-lg">
            View GitHub
          </button>
        </div>
      </section>

      {/* Live Preview */}
      <section className="max-w-7xl mx-auto px-8 pb-28">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Code Window */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-800">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>

              <span className="ml-4 text-slate-400 text-sm">
                Main.java
              </span>
            </div>

            <pre className="p-6 text-sm text-green-400 overflow-x-auto">
{`public class Main {

    public static void main(String[] args){

        System.out.println("Hello ReviewAI");

    }

}`}
            </pre>
          </div>

          {/* AI Review */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 shadow-xl">
            <h2 className="text-3xl font-bold mb-6">
              AI Review Result
            </h2>

            <div className="space-y-5">
              <div className="flex justify-between">
                <span>Code Quality</span>
                <span className="text-green-400 font-semibold">
                  9.5 / 10
                </span>
              </div>

              <div className="flex justify-between">
                <span>Bugs Found</span>
                <span className="text-red-400">0</span>
              </div>

              <div className="flex justify-between">
                <span>Security</span>
                <span className="text-green-400">Safe</span>
              </div>

              <div className="flex justify-between">
                <span>Performance</span>
                <span className="text-blue-400">Excellent</span>
              </div>

              <hr className="border-slate-700" />

              <p className="text-slate-400 leading-7">
                AI suggests improving variable names and adding comments for
                better readability. Overall the code follows good programming
                practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-10 pb-24">
        <h2 className="text-4xl font-bold text-center mb-14">
          Why Choose ReviewAI?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "AI Code Analysis",
              text: "Review your code using powerful AI models.",
            },
            {
              title: "Bug Detection",
              text: "Find bugs before deployment.",
            },
            {
              title: "Security Checks",
              text: "Detect insecure coding practices.",
            },
            {
              title: "Complexity Analysis",
              text: "Understand code quality and performance.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500 transition"
            >
              <h3 className="text-xl font-semibold mb-3">
                {item.title}
              </h3>

              <p className="text-slate-400">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;