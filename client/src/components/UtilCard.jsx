import React from "react";

function UtilCard(props) {
  return (
    <div className="utilCard font-Zilla text-lg mt-4 mb-16 md:mb-0 font-bold  flex justify-between p-2 text-gray-700 dark:text-white dark:text-opacity-70">
      <p>{props.remaining()} left</p>
      <button
        className=" active:opacity-50 focus:outline-none hover:-translate-y-0.5 transform font-bold"
        onClick={() => {
          props.clearCompleted();
        }}
      >
        {" "}
        Clear completed{" "}
      </button>
    </div>
  );
}

export default UtilCard;
