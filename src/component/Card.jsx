import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

function Card({ todo, deleteTodo, editTodo, onDragStart }) {
  if (!todo) return null;

  return (
    <div
      className="text-[#c9c8c8] shadow-[0_4px_20px_rgba(0,0,0,0.6)] mt-4 p-4 py-6 pt-8 bg-[#1A3636] rounded-lg cursor-grab"
      draggable
      onDragStart={(e) => onDragStart(e, todo.id)}
    >
      <div className="relative flex justify-center items-start">
        {todo?.priority && (
          <span className="absolute rounded-sm px-3 py-[3px] text-black text-[11px] font-bold w-auto bg-[#D6BD98] top-[-42px]">
            {todo.priority}
          </span>
        )}
      </div>
      <div className="flex justify-between">
        <h2 className="text-[20px] font-bold">{todo?.ticketName}</h2>
        <div className="flex gap-2 mt-1">
          <div className="cursor-pointer hover:text-[#D6BD98]" onClick={() => editTodo(todo.id)}>
            <CiEdit />
          </div>
          <div className="cursor-pointer hover:text-[#D6BD98]" onClick={() => deleteTodo(todo.id)}>
            <MdDelete />
          </div>
        </div>
      </div>
      <hr className="mt-[2px]" />
      <p className="text-[13px] mt-2 text-justify">{todo?.ticketDescription}</p>
    </div>
  );
}

export default Card;
