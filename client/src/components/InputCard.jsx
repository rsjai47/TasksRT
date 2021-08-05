import React, { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/outline";

function InputCard(props) {
  
  const [note, setNote] = useState({
    content: "",
    active: true,
    uname: props.uname,
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    props.onAdd(note);
    setNote({
      content: "",
      active: true,
      uname: props.uname
    });
    event.preventDefault();
  }

  return (
    <div className="inputCard bg-white dark:bg-dark-2 dark:text-white dark:text-opacity-90 text-lg mt-4 rounded-lg shadow-sm border-4  border-gray-300 dark:border-dark-3 focus-within:shadow-lg focus-within:border-indigo-700 dark:focus-within:border-indigo-700 dark:focus-within:border-opacity-50 hover:shadow-md hover:border-indigo-700">
      <form className="flex justify-between mx-2 my-2 ">
        <input
          className="w-full mx-2 focus:outline-none dark:bg-dark-2"
          name="content"
          placeholder={`new-todo @${props.uname}`}
          onChange={handleChange}
          value={note.content}
        />
        <button
          onClick={handleSubmit}
          className="w-10 active:opacity-50 focus:outline-none"
        >
          <PlusCircleIcon className="text-indigo-700 dark:text-indigo-600" />
        </button>
      </form>
    </div>
  );
}

export default InputCard;
