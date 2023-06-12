import React from "react"

export default function Start(props)
{
  return(
 
    <div className="start-container">
    
      <h1 className="heading">Quizzical</h1>
      <p className="desc">Some description if needed</p>
      <button  onClick={props.handleClick}>Start Quiz</button>
      
    </div>
  )
}