import { useState, useEffect } from "react";

const ModalBtn = ({ editTodoID }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ticketName, setTicketName] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (editTodoID) {
      console.log(editTodoID);
      
      const existingTodos = localStorage.getItem("todos")? JSON.parse(localStorage.getItem("todos")): [];
      const todoToEdit = existingTodos.find((todo) => todo.id === editTodoID);
      if (todoToEdit) {
        setTicketName(todoToEdit.ticketName);
        setPriority(todoToEdit.priority);
        setCategory(todoToEdit.category);
        setTicketDescription(todoToEdit.ticketDescription);
        setIsOpen(true);
      }
    }
  }, [editTodoID]);

  const handleEditTodo = () => {
    if (!ticketName || !priority || !category || !ticketDescription) {
      alert("Please fill all the fields!");
      return;
    }

    const existingTodos = localStorage.getItem("todos")?JSON.parse(localStorage.getItem("todos")):[];

    const updatedTodos = existingTodos.map((todo) =>
      todo.id === editTodoID? { ...todo, ticketName, priority, category, ticketDescription}: todo
    );

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    setTicketName("");
    setPriority("");
    setCategory("");
    setTicketDescription("");
    setIsOpen(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!ticketName || !priority || !category || !ticketDescription) {
      alert("Please fill all the fields!");
      return;
    }

    const existingTodos = localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : [];

    const newTodo = {
      id: new Date().getTime().toString(),
      ticketName,
      priority,
      category,
      ticketDescription,
    };

    const updatedTodos = [...existingTodos, newTodo];

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    setTicketName("");
    setPriority("");
    setCategory("");
    setTicketDescription("");
    setIsOpen(false);
  };

  return (
    <div>
      
      <button
        onClick={() => setIsOpen(true)}
        className="block text-white bg-[#546e65] hover:bg-[#677D6A] w-28 p-2 rounded-md font-medium text-[17px] text-center"
      >
        Add
      </button>

      
      {isOpen && (
        <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-[#1A3636] bg-opacity-75">
          <div className="relative p-4 w-full max-w-md rounded-lg shadow-sm bg-[#40534C]">
            
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {editTodoID ? "Edit Ticket" : "Create New Ticket"}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-[#677D6A] dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
            
            <form className="p-4">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Ticket Name
                  </label>
                  <input
                    type="text"
                    value={ticketName}
                    onChange={(e) => setTicketName(e.target.value)}
                    className="w-full p-2.5 border-[2px] border-[#1A3636] rounded-lg dark:bg-[#677D6A] dark:text-white"
                    placeholder="Type name"
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Priority
                  </label>
                  <select
                    className="w-full p-2.5 border-[2px] border-[#1A3636] rounded-lg dark:bg-[#677D6A] dark:text-white"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option disabled value="">
                      Select
                    </option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Category
                  </label>
                  <select
                    className="w-full p-2.5 border-[2px] border-[#1A3636] rounded-lg dark:bg-[#677D6A] dark:text-white"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option disabled value="">
                      Select
                    </option>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Ticket Description
                  </label>
                  <textarea
                    rows="4"
                    className="w-full p-2.5 border-[2px] border-[#1A3636] rounded-lg dark:bg-[#677D6A] dark:text-white"
                    placeholder="Write description here"
                    value={ticketDescription}
                    onChange={(e) => setTicketDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-[#546e65] hover:bg-[#1A3636] p-2 rounded-md font-medium text-[17px]"
                onClick={editTodoID ? handleEditTodo : submitHandler}
              >
                {editTodoID ? "Edit Ticket" : "Add Ticket"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalBtn;
