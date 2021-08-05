import React from "react";
import { CheckCircleIcon, XIcon } from "@heroicons/react/outline";
import { CheckCircleIcon as CheckCircleSolidIcon } from "@heroicons/react/solid";

function Todos(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  function handleCompleted() {
    props.onCompleted(props.id);
  }

  return (
    <div
      className={`todos  bg-white dark:bg-dark-2 text-base mt-3  flex justify-between p-2 text-gray-700 dark:text-white rounded-lg 
                        shadow-md border-2 border-gray-300 dark:border-dark-3 border-opacity-20 hover:-translate-y-0.5 transform ${
                          props.active ? "text-opacity-100 dark:text-opacity-90" : "text-opacity-50 dark:text-opacity-50"
                        }`}
    >
      <button onClick={handleCompleted} className = "focus:outline-none">
        {props.active ? (
          <CheckCircleIcon className=" w-7 active:opacity-50 focus:outline-none" />
        ) : (
          <CheckCircleSolidIcon className=" w-7 active:opacity-50 focus:outline-none" />
        )}
      </button>
      <div className="w-full mx-2 overflow-ellipsis overflow-hidden">
        <p className={`${props.active ? "no-underline" : "line-through"}`}>
          {props.content} <span className="opacity-30 pl-2">@{props.uname}</span>
        </p>
      </div>
      <button onClick={handleClick} className = "focus:outline-none">
        {" "}
        <XIcon className=" w-6 text-gray-700 dark:text-white dark:text-opacity-50 active:opacity-50 focus:outline-none" />
      </button>
    </div>
  );
}

export default Todos;
