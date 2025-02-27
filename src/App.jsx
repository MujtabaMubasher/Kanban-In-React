import React, { useEffect, useState } from "react";
import "./App.css";
import Kanban from "./component/Kanban";
import ModalBtn from "./component/ModalBtn";

function App() {
  const [todoArr, setTodoArr] = useState([]);
  const [inProgressArr, setInProgress] = useState([]);
  const [doneArr, setDone] = useState([]);
  const [getAllTodos, setGetAllTodos] = useState(() => (localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []));
  const [editTodoID, setEditTodoID] = useState(null);

  useEffect(() => {
    const todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
    setGetAllTodos(todos);
  }, [getAllTodos]);

  useEffect(() => {
    setTodoArr(getAllTodos.filter((todo) => todo.category === "To Do"));
    setInProgress(getAllTodos.filter((todo) => todo.category === "In Progress"));
    setDone(getAllTodos.filter((todo) => todo.category === "Done"));
  }, [getAllTodos]);

  const deleteTodo = (id) => {
    const updatedTodos = getAllTodos.filter((todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setGetAllTodos(updatedTodos);
  };

  const editTodo = (id) => {
    setEditTodoID(id);
  };

  const moveTodo = (id, newCategory) => {
    const updatedTodos = getAllTodos.map((todo) =>
      todo.id === id ? { ...todo, category: newCategory } : todo
    );
    setGetAllTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const shiftTodo = (id, direction, category) => {
     
  };
  
  

  return (
    <>
      <div className="w-[100%] h-[10vh] flex items-center justify-center mt-20">
        <ModalBtn editTodoID={editTodoID} />
      </div>
      <div className="w-[100%] h-[auto] flex mt-10 justify-center items-center">
        <div className="bg-[#40534C] w-[auto] h-[auto] p-6 flex">
          <Kanban title="To Do" todos={todoArr} deleteTodo={deleteTodo} editTodo={editTodo} moveTodo={moveTodo} shiftTodo ={shiftTodo} />
          <Kanban title="In Progress" todos={inProgressArr} deleteTodo={deleteTodo} editTodo={editTodo} moveTodo={moveTodo} />
          <Kanban title="Done" todos={doneArr} deleteTodo={deleteTodo} editTodo={editTodo} moveTodo={moveTodo} />
        </div>
      </div>
    </>
  );
}

export default App;
