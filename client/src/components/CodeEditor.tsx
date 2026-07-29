import { useState } from "react";
import Editor from "@monaco-editor/react";
import api from "../services/api";

function CodeEditor() {
  const [code, setCode] = useState(`public class Main {

    public static void main(String[] args){

        System.out.println("Hello ReviewAI");

    }

}`);

  const [review, setReview] = useState("");

  const [loading, setLoading] = useState(false);

  async function reviewCode() {
    try {
      setLoading(true);

      const response = await api.post("/review", {
        code,
      });

      setReview(response.data.review);

    } catch (error) {
      console.error(error);

      setReview("Something went wrong while reviewing your code.");
    }

    setLoading(false);
  }

  return (
    <div className="space-y-6">

      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">

        <Editor
          height="500px"
          defaultLanguage="java"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || "")}
        />

      </div>

      <button
        onClick={reviewCode}
        className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl"
      >
        {loading ? "Reviewing..." : "Review Code"}
      </button>

      {review && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 whitespace-pre-wrap">
          {review}
        </div>
      )}

    </div>
  );
}

export default CodeEditor;