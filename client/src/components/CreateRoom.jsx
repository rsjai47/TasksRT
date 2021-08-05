import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { customAlphabet } from 'nanoid'

function CreateRoom() {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 4)
    

    useEffect(() => {

        if(!('theme' in localStorage)){
          localStorage.theme = 'dark';
        }
    
        if (localStorage.theme === 'dark') {
          document.querySelector('html').classList.add('dark')
        } else {
          document.querySelector('html').classList.remove('dark')
        }
      }, []);

    return (
        <div className="flex flex-col mx-auto md:max-w-2xl py-4 px-2">
          <form className="flex flex-col  dark:text-white dark:text-opacity-90 text-xl m-2 justify-center mt-28">
            <div className="overflow-ellipsis overflow-hidden ">
              <span className="text-5xl font-Zilla font-bold ">#</span>
              <span className="text-4xl font-Zilla font-bold mx-1 truncate">
                Create to-do
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
                value = {name}
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
                value = {room}
              />
            </div>
            <Link
              onClick={(event) => {

                const nameMod = name.trim().toLowerCase();
                const roomMod = room.trim().toLowerCase();
                if(!nameMod || !roomMod ){
                    setName('');
                    setRoom('');
                    event.preventDefault();
                }
                else return null;
                
              }}
              to={`/task?name=${name.toLowerCase()}&room=${room.toLowerCase()}::${nanoid().toLowerCase()}`}
            >
              <button
                className="button focus:outline-none active:opacity-50 font-Zilla text-white bg-dark-1 dark:bg-indigo-700 dark:bg-opacity-70 text-xl border-2 border-opacity-5 flex justify-center px-2 py-3 rounded-lg shadow-md w-full mt-14"
                type="submit"
              >
                Create
              </button>
            </Link>
            <Link to={`/`}>
              <button className=" active:opacity-50 focus:outline-none hover:-translate-y-0.5 transform font-bold font-Zilla text-md mt-3 mb-10 p-2 text-gray-700 dark:text-white dark:text-opacity-70">
                Join to-do
              </button>
            </Link>
          </form>
        </div>
      );
}

export default CreateRoom;