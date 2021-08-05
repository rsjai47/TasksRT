import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { customAlphabet } from "nanoid";
import Cookies from "js-cookie";

function Login() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [tag, setTag] = useState("");
  const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 4);
  let history = useHistory();

  useEffect(() => {
    if (!("theme" in localStorage)) {
      localStorage.theme = "dark";
    }

    if (localStorage.theme === "dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (Cookies.get("auth")) {
      let myCookies = JSON.parse(Cookies.get("auth"));
      console.log(myCookies);
      history.push(
        `/task?name=${myCookies.name.toLowerCase()}&room=${myCookies.room.toLowerCase()}::${myCookies.tag.toLowerCase()}`
      );
    }
  }, [history]);

  return (
    <div className="flex flex-col mx-auto md:max-w-2xl py-4 px-2">
      <form className="flex flex-col  dark:text-white dark:text-opacity-90 text-xl m-2 justify-center mt-20">
        <div className="overflow-ellipsis overflow-hidden">
          <span className="text-5xl font-Zilla font-bold ">#</span>
          <span className="text-4xl font-Zilla font-bold mx-1 truncate">
            Join to-do
          </span>
        </div>
        <div
          className={`todos  bg-white dark:bg-dark-2 text-xl mt-7  flex justify-between p-3 text-gray-700 dark:text-white rounded-lg 
                        shadow-sm border-4 border-gray-300 dark:border-dark-3 focus-within:border-indigo-700 dark:focus-within:border-indigo-700 dark:focus-within:border-opacity-70 hover:shadow-md hover:border-indigo-700 `}
        >
          <input
            placeholder="@Username"
            type="text"
            className="lowercase w-full mx-2 focus:outline-none dark:bg-dark-2"
            onChange={(event) => setName(event.target.value)}
            value={name}
          />
        </div>
        <div
          className={`todos  bg-white dark:bg-dark-2 text-xl mt-6  flex justify-between p-3 text-gray-700 dark:text-white rounded-lg 
                        shadow-sm border-4 border-gray-300 dark:border-dark-3 focus-within:border-indigo-700 dark:focus-within:border-indigo-700 dark:focus-within:border-opacity-70 hover:shadow-md hover:border-indigo-700 `}
        >
          <input
            placeholder="#room"
            type="text"
            className="lowercase w-full mx-2 focus:outline-none dark:bg-dark-2"
            onChange={(event) => setRoom(event.target.value)}
            value={room}
          />
        </div>
        <div
          className={`todos  bg-white dark:bg-dark-2 text-xl mt-6  flex justify-between p-3 text-gray-700 dark:text-white rounded-lg 
                        shadow-sm border-4 border-gray-300 dark:border-dark-3 focus-within:border-indigo-700 dark:focus-within:border-indigo-700 dark:focus-within:border-opacity-70 hover:shadow-md hover:border-indigo-700 `}
        >
          <input
            placeholder="::tag"
            type="text"
            className="lowercase w-full mx-2 focus:outline-none dark:bg-dark-2"
            onChange={(event) => setTag(event.target.value)}
            value={tag}
          />
        </div>

        <Link
          onClick={(event) => {
            setTag(nanoid());
            const nameMod = name.trim().toLowerCase();
            const roomMod = room.trim().toLowerCase();
            const tagMod = tag.trim().toLowerCase();
            if (tagMod.length !== 4) {
              setName("");
              setRoom("");
              setTag("");
              return event.preventDefault();
            }
            if (!nameMod || !roomMod || !tagMod) {
              setName("");
              setRoom("");
              setTag("");
              event.preventDefault();
            } else return null;
          }}
          to={`/task?name=${name.toLowerCase()}&room=${room.toLowerCase()}::${tag.toLowerCase()}`}
        >
          <button
            className="button focus:outline-none active:opacity-50 font-Zilla text-white bg-dark-1 dark:bg-indigo-700 dark:bg-opacity-70 text-xl border-2 border-opacity-5 flex justify-center px-2 py-3 rounded-lg shadow-md w-full mt-14"
            type="submit"
          >
            Join
          </button>
        </Link>
        <Link to={`/createroom`}>
          <button className=" active:opacity-50 focus:outline-none hover:-translate-y-0.5 transform font-bold font-Zilla text-md mt-3 p-2 text-gray-700 dark:text-white dark:text-opacity-70">
            Create to-do
          </button>
        </Link>
      </form>
    </div>
  );

  // return(
  //     <div className="flex flex-col mx-auto">
  //         <h1>Login</h1>
  //         <input placeholder="name" type="text" className="lowercase" onChange= {(event)=> setName(event.target.value)} />
  //         <input placeholder="room" type="text" className="lowercase" onChange= {(event)=> setRoom(event.target.value)} />
  //         <Link onClick={(event) => {
  //             const nameMod = name.trim().toLowerCase()
  //             const roomMod = room.trim().toLowerCase()
  //             return (!nameMod || !roomMod) ? event.preventDefault() : null}}  to={`/task?name=${name.toLowerCase()}&room=${room.toLowerCase()}`}>
  //             <button className = "button" type="submit">Sign In</button>
  //         </Link>
  //     </div>
  // )
}

export default Login;
