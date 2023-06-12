import React from "react"
import Start from "./Components/start.js"
import Quiz from "./Components/quiz.js"
export default function App()
{
  const[startscreen,setStartScreen]=React.useState(true)
  const [questions,setQuestions]=React.useState([])
  
  function startGame()
  {
    setStartScreen((prev)=>!prev)
  }

  React.useEffect(()=>
  {
  const Number_Of_Questions=5
  const fetchQuestions=async()=>{
    
    try
     {
       const response=await fetch(
        `https://opentdb.com/api.php?amount=${Number_Of_Questions}&type=multiple&encode=base64`)
       const data=await response.json()  
       const formattedQuestions=data.results.map((question)=>
       {
        return {
          question:atob(question.question),
          correct_answer:atob(question.correct_answer),
          allAnswers:[
            atob(question.correct_answer),...question.incorrect_answers.map((incorrectAnswer)=>
            atob(incorrectAnswer))
          ].sort(()=>Math.random()-0.5)
        }
       })
       setQuestions(formattedQuestions)

  } catch(error)
  {
    console.error(error)
  }
  }
  fetchQuestions()
},[])
  return(
   <div className="App">
    {
      startscreen && <Start handleClick={startGame}/>
    }
    {
      !startscreen && <Quiz questions={questions}/>
    }
   </div>
   
  )
}