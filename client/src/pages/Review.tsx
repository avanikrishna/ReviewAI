import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CodeEditor from "../components/CodeEditor";

interface ReviewHistory {
  _id: string;
  code: string;
  review: string;
  createdAt: string;
}

function Review() {
  const [history, setHistory] = useState<ReviewHistory[]>([]);

  useEffect(() => {
    fetch("http://localhost:5050/history")
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto p-10">
        <h1 className="text-5xl font-bold mb-4">
          Review Your Code
        </h1>

        <p className="text-slate-400 mb-10">
          Paste your code below and let AI review it.
        </p>

        <CodeEditor />

        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-6">
            📜 Review History
          </h2>

          {history.length === 0 ? (
            <p className="text-slate-400">
              No reviews yet.
            </p>
          ) : (
            <div className="space-y-6">
              {history.map((item) => (
                <div
                  key={item._id}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6"
                >
                  <p className="text-sm text-slate-400 mb-3">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>

                  <h3 className="font-semibold mb-2">
                    Code
                  </h3>

                  <pre className="bg-slate-950 p-4 rounded overflow-auto text-sm">
                    {item.code}
                  </pre>

                  <h3 className="font-semibold mt-5 mb-2">
                    AI Review
                  </h3>

                  <pre className="whitespace-pre-wrap text-slate-300">
                    {item.review}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Review;