import { useState } from "react";
import Editor from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";
import { reviewCode } from "./services/reviewService";
import "./App.css";


function App() {


  const [code, setCode] = useState(
`function add(a,b){
 return a+b;
}`
  );


  const [language, setLanguage] = useState("javascript");


  const [review, setReview] = useState("");

  const [loading, setLoading] = useState(false);



  const [repoUrl, setRepoUrl] = useState("");

  const [repoReview, setRepoReview] = useState("");

  const [repoLoading, setRepoLoading] = useState(false);




  const handleReview = async () => {


    try {

      setLoading(true);

      setReview("");

      const data = await reviewCode(code);

      setReview(data.review);


    } catch(error) {


      setReview(
        "❌ Failed to get AI review"
      );


    }
    finally {

      setLoading(false);

    }


  };







  const handleGithubReview = async () => {


    if(!repoUrl) return;


    try {


      setRepoLoading(true);

      setRepoReview("");



      const response = await fetch(

        "http://localhost:5050/github-review",

        {

          method:"POST",

          headers:{

            "Content-Type":"application/json"

          },


          body:JSON.stringify({

            repoUrl

          })

        }

      );



      const data = await response.json();


      setRepoReview(data.review);



    }

    catch(error){


      setRepoReview(
        "❌ GitHub analysis failed"
      );


    }

    finally{


      setRepoLoading(false);


    }


  };






  const scoreMatch = review.match(/\b\d{1,3}\b/);

  const score = scoreMatch
    ? scoreMatch[0]
    : null;







  return (


    <div className="container">


      <h1>
        🤖 ReviewAI
      </h1>


      <p>
        AI Powered Code Review Assistant
      </p>





      <select

        className="language-select"

        value={language}

        onChange={(e)=>setLanguage(e.target.value)}

      >


        <option value="javascript">
          JavaScript
        </option>


        <option value="typescript">
          TypeScript
        </option>


        <option value="python">
          Python
        </option>


        <option value="java">
          Java
        </option>


        <option value="cpp">
          C++
        </option>


      </select>







      <div className="editor">


        <Editor

          height="400px"

          language={language}

          value={code}

          onChange={(value)=>setCode(value || "")}

          theme="vs-dark"

        />


      </div>






      <button onClick={handleReview}>


        {

          loading

          ?

          "🔍 Analyzing..."

          :

          "🚀 Review Code"

        }


      </button>








      {

        review &&


        <div className="review-box">


          <h2>
            🤖 AI Code Review
          </h2>





          {

            score &&


            <div className="score-card">


              <h3>
                📊 Code Score
              </h3>


              <div className="score-number">

                {score}

                <span>
                  /100
                </span>

              </div>


            </div>


          }






          <ReactMarkdown>

            {review}

          </ReactMarkdown>




        </div>


      }









      <div className="review-box">



        <h2>
          🔗 GitHub Repository Analyzer
        </h2>





        <input


          value={repoUrl}


          onChange={(e)=>setRepoUrl(e.target.value)}


          placeholder="Paste GitHub repository URL"


          style={{

            width:"100%",

            padding:"12px",

            borderRadius:"8px",

            marginBottom:"15px"

          }}



        />





        <button onClick={handleGithubReview}>


          {

            repoLoading

            ?

            "🔍 Analyzing Repository..."

            :

            "🚀 Analyze Repository"


          }


        </button>








        {

          repoReview &&


          <div className="github-result">


            <h2>
              📊 Repository Analysis
            </h2>



            <ReactMarkdown>

              {repoReview}

            </ReactMarkdown>



          </div>


        }



      </div>






    </div>


  );


}



export default App;