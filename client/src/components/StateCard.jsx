import React from "react";

function StateCard(props) {
  function handleClick(event) {
    props.onModeChange(event.target.name);
  }
  return (
    <div className="stateCard fixed bottom-0 inset-x-0 px-4 pb-4 bg-white dark:bg-dark-1 bg-opacity-70 md:static md:p-0 md:bg-opacity-0">
      <div
        className="font-Zilla bg-dark-1 dark:bg-indigo-700 dark:bg-opacity-50 text-lg border-2 border-opacity-5 md:mt-3 flex justify-evenly px-2 py-3 rounded-lg 
        shadow-md  "
      >
        <button
          className={`active:opacity-50 focus:outline-none ${
            props.currentMode === "all"
              ? "text-indigo-500 font-semibold dark:text-white"
              : "text-gray-300 text-opacity-70 dark:text-opacity-50"
          }`}
          name="all"
          onClick={handleClick}
        >
          All
        </button>
        <button
          className={`active:opacity-50 focus:outline-none ${
            props.currentMode === "active"
            ? "text-indigo-500 font-semibold dark:text-white"
            : "text-gray-300 text-opacity-70 dark:text-opacity-50"
          }`}
          name="active"
          onClick={handleClick}
        >
          Active
        </button>
        <button
          className={`active:opacity-50 focus:outline-none ${
            props.currentMode === "completed"
            ? "text-indigo-500 font-semibold dark:text-white"
            : "text-gray-300 text-opacity-70 dark:text-opacity-50"
          }`}
          name="completed"
          onClick={handleClick}
        >
          Completed
        </button>
      </div>
    </div>
  );
}

export default StateCard;
