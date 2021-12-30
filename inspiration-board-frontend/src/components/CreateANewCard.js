import React from "react";
import { useState } from "react";
import './CreateANewCard.css'

const CreateANewCard = (props) => {

  const [message, setMessage] = useState('')
  
  const messageEvent = (event) => {
      console.log(event)
      setMessage(event.target.value)
  }; 
  const postCards = (event) =>{

      event.preventDefault(); // prevents webpage from refresh because it's a single page app
      props.postANewCard(message)
  };

  return (
  <form onSubmit ={postCards} method = ''>
    <div>
      <h3 className = 'newCard'>Create A New Card</h3>
      <label htmlFor = 'message'>Message</label>
      <input type = 'text'name = 'message' id = 'message' placeholder = 'type a cute message...'onChange = {messageEvent}  maxLength = '40' required/>
      <div>
      <input className = 'SubmitButton'type = 'submit'value='Submit'/> 
      </div>

      <div>
      <button className = 'reset' type = 'reset'>Reset</button>
      </div>
      
    </div>
  </form>
  )
};

export default CreateANewCard;
