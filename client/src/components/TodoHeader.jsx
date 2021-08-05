import React from "react";
import { MoonIcon } from "@heroicons/react/solid";
import { LogoutIcon } from "@heroicons/react/outline";
import Cookies from 'js-cookie'


function TodoHeader(props) {

  const dispRoom = props.room.slice(0,-6);
  const dispTag = props.room.slice(-4);
  return (
    <div className="todoHeader flex items-baseline justify-between dark:text-white">
      <div className="overflow-ellipsis overflow-hidden">
        <span className="text-5xl font-Zilla font-bold ">#</span><span className="text-4xl font-Zilla font-bold mx-1 truncate">{dispRoom}</span><span className="text-lg font-Zilla font-semibold opacity-70"> :: {dispTag}</span>
      </div>
      <div className="flex space-x-4 ml-3">
        <button onClick={() => {props.switchTheme();}} className="darkmode active:opacity-50 mr-1 focus:outline-none">
          <MoonIcon className="w-6 h-6" />
        </button>
        
          <button onClick={() => {Cookies.remove('auth')}} className="logOut active:opacity-50 focus:outline-none">
            <a href = '/'><LogoutIcon className="w-6 h-6" /></a>
          </button>

      </div>
    </div>
  );
}

export default TodoHeader;
