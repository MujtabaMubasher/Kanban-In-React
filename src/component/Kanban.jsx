import React from "react";
import Card from "./Card";

function Kanban({ title, todos, deleteTodo, editTodo, moveTodo, shiftTodo }) {
    const handleDragStart = (e, todo) => {
        e.dataTransfer.setData("todoId", todo.id);
    };

    const handleDragOver = (e) => {
        e.preventDefault(); 
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const todoId = e.dataTransfer.getData("todoId");
        moveTodo(todoId, title);
    };

    return (
        <div
            className="w-[320px] min-h-[auto] bg-[#677D6A] m-4 rounded-lg px-6 py-6"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, null)} 
        >
            <h1 className="text-center text-[25px] font-bold text-white">{title}</h1>
            <div className="flex flex-col gap-5">
                {todos.map((todo) => (
                    <Card
                        key={todo.id}
                        todo={todo}
                        deleteTodo={deleteTodo}
                        editTodo={editTodo}
                        draggable
                        onDragStart={(e) => handleDragStart(e, todo)}
                        onDrop={(e) => handleDrop(e, todo)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Kanban;
