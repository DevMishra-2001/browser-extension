import { useEffect, useState } from "react"
import { v4 as uuid } from "uuid"
import "./Todo.css"
export const Todo = () => {
    const [todo,setTodo] = useState("")
    const [todoList, setTodoList] = useState([])
    useEffect( () => {
      const userTodo = JSON.parse(localStorage.getItem("todo"))
      userTodo && setTodoList(userTodo)
    },[])
    const handleTodoEnterKey = (event) => {
       if(event.key === "Enter") {
        const updatedList = [...todoList, {_id : uuid(), todo, isCompleted : false }]
        setTodoList(updatedList);
        setTodo("")
        localStorage.setItem("todo", JSON.stringify(updatedList))
       }
    }
    const handleTodoInputChange = (e) => {
        setTodo(e.target.value)

    }
    const handleTodoCheckChange = (todoId) => {
         const updatedToDoList = todoList.map( todo => todoId === todo._id ? {...todo, isCompleted :!todo.iscomleted}
            : todo)
            setTodoList(updatedToDoList)
            localStorage.setItem("todo", JSON.stringify(updatedToDoList))

    }
    const handleToDoDeleteClick = (todoId)=> {
        const updatedToDoList = todoList.filter(({_id}) => todoId !== _id)
        setTodoList(updatedToDoList);
        localStorage.setItem("todo", JSON.stringify(updatedToDoList))
    }
    return (
        <div className="todo-container absolute">
        <div className="todo-input-container">
            <input className = "todo-input" value = {todo} onChange = {handleTodoInputChange} onKeyPress = {handleTodoEnterKey}/>
        </div>
        <div className="todo-list">
            {
                todoList && todoList.map( ({todo,_id,isCompleted}) => {
                    return (
                        <div key = {_id} className="todo-items d-flex align-center">
                          <label className= {` ${isCompleted ? "strike-through" :""} todo-label`}><input className ="todo-check" checked = {isCompleted} type = "checkbox" onClick = {() =>handleTodoCheckChange(_id)}/>{todo}</label>
                          <button className="button cursor todo-clear-btn" onClick={() => handleToDoDeleteClick(_id)}>
                          <span class="material-icons-outlined">clear</span>
                          </button>
                        </div>
                    )
                })
            }
        </div>
        </div>
    )
}