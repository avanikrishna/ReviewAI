import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import axios from "axios";
import Groq from "groq-sdk";
import mongoose from "mongoose";
import Review from "./models/Review.js";

const app = express();

app.use(cors());
app.use(express.json());


const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:", err);
  });



// Home Route
app.get("/", (req, res) => {
  res.send("ReviewAI Server Running 🚀");
});




// AI Code Review
app.post("/review", async (req, res) => {

  console.log("Review request received");


  try {

    const { code } = req.body;


    if (!code) {

      return res.status(400).json({
        error: "No code provided"
      });

    }



    const response = await groq.chat.completions.create({

      model: "llama-3.3-70b-versatile",

      messages: [

        {
          role: "system",
          content:
          "You are an expert senior software engineer and code reviewer."
        },


        {
          role: "user",
          content: `

Review this code.

Provide:

📊 SCORE (0-100)

🐛 BUGS

📋 CODE QUALITY

⚡ OPTIMIZATION

💻 IMPROVED CODE


Code:

${code}

`
        }

      ]

    });



    const aiReview = response.choices[0].message.content;

// Save review to MongoDB
await Review.create({
  code,
  review: aiReview,
});

res.json({
  review: aiReview,
});


  } catch(error) {


    console.error(
      "Review Error:",
      error.message
    );


    res.status(500).json({

      error:"AI review failed",
      details:error.message

    });


  }

});









// GitHub Repository Analyzer

app.post("/github-review", async (req, res) => {


  console.log("GitHub review request received");



  try {


    const { repoUrl } = req.body;



    if (!repoUrl) {

      return res.status(400).json({

        error:"GitHub URL required"

      });

    }



    const parts = repoUrl.split("/");


    const owner = parts[3];
    const repo = parts[4];



    console.log(
      `Analyzing ${owner}/${repo}`
    );




    // Get repository files

    const filesResponse = await axios.get(

      `https://api.github.com/repos/${owner}/${repo}/contents`

    );





    // Important files + source files

    const importantFiles = [

      "README.md",
      "package.json",
      "requirements.txt",
      "app.js",
      "server.js",
      "index.js"

    ];



    const files = filesResponse.data

      .filter(file => {


        return (

          file.type === "file" &&

          (

            importantFiles.includes(file.name) ||

            file.name.endsWith(".js") ||

            file.name.endsWith(".ts") ||

            file.name.endsWith(".tsx") ||

            file.name.endsWith(".py")

          )

        );


      })

      .slice(0,20);






    let projectCode = "";




    for (const file of files) {


      try {


        const fileResponse = await axios.get(
          file.download_url
        );



        projectCode += `


========================

FILE:

${file.name}


CONTENT:

${fileResponse.data}


========================


`;



      }

      catch(error) {


        console.log(
          "Skipped:",
          file.name
        );


      }


    }







    const response = await groq.chat.completions.create({



      model:"llama-3.3-70b-versatile",



      messages:[


        {


          role:"system",

          content:

          "You are a senior software architect reviewing GitHub repositories."

        },



        {



          role:"user",


          content:`


Analyze this GitHub project.


Give:


📊 PROJECT SCORE /10


🛠 TECH STACK DETECTED

List the technologies detected like:

Frontend:
Backend:
Database:
Tools:


🏗 ARCHITECTURE REVIEW


🐛 ISSUES FOUND


⚡ IMPROVEMENTS


🚀 FINAL RECOMMENDATIONS


🏗 ARCHITECTURE REVIEW



⚡ IMPROVEMENTS


🚀 FINAL RECOMMENDATIONS




Repository Files:


${projectCode}



`

        }



      ]



    });







    res.json({


      review:

      response.choices[0].message.content


    });







  }


  catch(error) {


    console.error(

      "GitHub Error:",

      error.message

    );



    res.status(500).json({

      error:"GitHub analysis failed",

      details:error.message

    });



  }


});








// Get Review History
app.get("/history", async (req, res) => {

  try {

    const reviews = await Review.find()
      .sort({ createdAt: -1 });

    res.json(reviews);

  } catch (error) {

    res.status(500).json({
      error: "Failed to fetch history"
    });

  }

});

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});
