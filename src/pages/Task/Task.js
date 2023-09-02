import "./Task.css"
import { useBrowser } from "../../context/browser-context";
import { Fragment,useEffect, useState } from "react";
import {quotes} from "../../db/quote.js"
import {Todo} from "../../Components/Todo/Todo"
const index = Math.floor(Math.random() * quotes.length)
const quote = quotes[index].quote
export const Task = () => {
    const[isChecked, setIsChecked] = useState(false);
    const[isTodoOpen, setIsTodoOpen] = useState(false)
   const {name,time,message,task,browserDispatch} = useBrowser()
   // here handling after every refresh of the page task won't disappear
   useEffect ( () => {
       const userTask = localStorage.getItem("task")
       browserDispatch({
        type : "TASK",
        payload : userTask
       })
       if(new Date().getDate() !== Number(localStorage.getItem("date"))) 
       {
          localStorage.removeItem("task")
          localStorage.removeItem("date")
          localStorage.removeItem("checkedStatus")
       }
   },[])
   useEffect( () => {
    getCurrentTime()
   },[time])
   useEffect( ()=> {
    const checkStatus = localStorage.getItem("checkedStatus");
      checkStatus === "true" ? setIsChecked(true) : setIsChecked(false)
   },[])
   const handleSubmit = (e) => {
       e.preventDefault()
   }
   const handleTaskChange = (e) => {
        if(e.key === "Enter" && e.target.value.length > 0 )
        {
            browserDispatch({
                type : "TASK",
                payload : e.target.value
            })
            localStorage.setItem("task",e.target.value)
            localStorage.setItem("date", new Date().getDate());

        }
   }
   const handleClearClick = () => {
    browserDispatch({
        type : "CLEAR"
    })
    setIsChecked(false)
    localStorage.removeItem("task")
    localStorage.removeItem("checkedStatus")
   }
   const getCurrentTime = () => {
    const today = new Date();
    const hours = today.getHours()
    const minutes = today.getMinutes()  
    
    const hour = hours < 10 ? `0${hours}` : hours
    const minute = minutes < 10 ? `0${minutes}` : minutes
    const currentTime = `${hour} : ${minute}`
    setTimeout(getCurrentTime,1000)
    browserDispatch({
        type : "TIME",
        payload : currentTime
    })
    browserDispatch({
        type : "MESSAGE",
        payload : hours
    })

   }
    const handleCompleteTaskChange = (event) => {
       if(event.target.checked)
       {
         setIsChecked(isChecked => !isChecked)
       }
       else 
       {
        setIsChecked(isChecked => !isChecked)
       }
       localStorage.setItem("checkedStatus", !isChecked)
    }
    const handleToDoClick = () => {
       setIsTodoOpen( isTodoOpen => !isTodoOpen)
    }
    return (
    <div className="task-container d-flex direction-column align-center relative">
        <span className="time">{time}</span>
        <span className="message">{message},{name}</span>
        { name !== null && task === null ? (
            <Fragment>
            <span className="focus-question">What is your main focus for Today?</span>
            <form onSubmit = {handleSubmit}>
            <input required className="input task-input" onKeyPress = {handleTaskChange}/>
            </form>
        </Fragment>
        ) : (
            <div className="user-task-container d-flex direction-column align-center gap-sm">
            <span className="heading-2">Today's Focus</span>
                <div className="d-flex align-center gap">
                <label className={`${isChecked ? "strike-through" : ""} heading-3 d-flex align-center gap-sm cursor`}>
                <input className = "check cursor" type="checkbox" onChange = {handleCompleteTaskChange} checked = {isChecked}/>
                {task}
                </label>
            <button className="button cursor" onClick = {handleClearClick}>
            <span class="material-icons-outlined">clear</span>
            </button>
            </div>
            </div>
        ) }
        <div className="quote-container">
           <span className="heading-3">{quote}</span>
        </div>
        {isTodoOpen && <Todo/>}
        <div className="todo-button-container absolute">
          <button className="button cursor todo-btn" onClick = {handleToDoClick}>ToDo</button>
        </div>
    </div>
   )
}