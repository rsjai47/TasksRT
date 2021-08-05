import React, { useState, useEffect } from "react";
import TodoHeader from "./TodoHeader";
import InputCard from "./InputCard";
import Todos from "./Todos";
import UtilCard from "./UtilCard";
import StateCard from "./StateCard";
import queryString from "query-string";
import io from 'socket.io-client';
import Cookies from 'js-cookie'

let socket;

function Task({ location }) {
  const [notes, setNotes] = useState([]);
  const [mode, setMode] = useState("all");
  const [uname, setUname] = useState(queryString.parse(location.search).name);
  const [room, setRoom] = useState('');
  const ENDPOINT = 'https://react-tasksrt-application.herokuapp.com/'


  // add the task data from localstorage
  useEffect(() => {
    const data = localStorage.getItem(`todo-${queryString.parse(location.search).room}`);
    if (data) {
      setNotes(JSON.parse(data));
    }
  }, [location.search]);

  useEffect(() => {
    localStorage.setItem(`todo-${queryString.parse(location.search).room}`, JSON.stringify(notes));
  }, [notes,location.search]);

  //useEffect for socket login
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    const dispRoom = room.slice(0,-6);
    const dispTag = room.slice(-4);

    let auth ={name: name,room: dispRoom, tag: dispTag};
    Cookies.set('auth', JSON.stringify(auth),{ expires: 30 });
    
    socket = io(ENDPOINT);
    setUname(name);
    setRoom(room);

    socket.emit('login', { name, room }, (error) => {
      if (error) {
        console.log(error)
      }
    });

  }, [ENDPOINT, location.search]);

  // useEffect for updating todos
  useEffect(() => {
    socket.on('newUserJoined', (id) => {
      console.log('new user gg');
      socket.emit('sendTodoInit', notes, id);

    })
    socket.on('todo', (todoData) => {

      setNotes(todoData)
    });

    return function cleanup() {
      socket.off('newUserJoined');
      socket.off('todo');
    }
  }, [notes]);


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


  function addNote(newNote) {
    const temp = [...notes, newNote];
    socket.emit('sendTodo', temp);

  }

  function deleteNote(id) {

    const temp = notes.filter((noteItem, index) => {
      return index !== id;
    });
    socket.emit('sendTodo', temp);

  }

  function completedNote(id) {
    let newNotes = [...notes];

    newNotes[id] = { ...newNotes[id], active: !newNotes[id].active };

    socket.emit('sendTodo', newNotes);
  }

  function modeChange(state) {
    setMode(state);
  }

  function noActiveNotes() {
    let count = 0;

    notes.forEach((note) => {
      if (note.active) {
        count++;
      }
    });
    return count;
  }

  function clearCompleted() {
    const temp = notes.filter((noteItem, index) => {
      return noteItem.active;
    });
    socket.emit('sendTodo', temp);
  }

  function switchTheme() {
    if (localStorage.theme === 'dark') {
      document.querySelector('html').classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.querySelector('html').classList.add('dark');
      localStorage.theme = 'dark';
    }
  }

  return (
    <div className="flex flex-col mx-auto md:max-w-2xl ">
      <div className="flex flex-col px-4 pt-3 pb-0 mt-28 mb-4 z-40 sticky top-0 bg-white dark:bg-dark-1 bg-opacity-95">
        <TodoHeader switchTheme={switchTheme} room={room} />
        <InputCard onAdd={addNote} uname={uname} />
      </div>
      <div className="flex flex-col px-4 pb-4">
        {/*for rendering active state first*/}
        {notes.map((noteItem, index) => {
          if (
            mode === "all" ||
            (mode === "active" && noteItem.active) ||
            (mode === "completed" && !noteItem.active)
          ) {
            if (noteItem.active)
              return (
                <Todos
                  key={index}
                  id={index}
                  content={noteItem.content}
                  active={noteItem.active}
                  uname={noteItem.uname}
                  onDelete={deleteNote}
                  onCompleted={completedNote}
                />
              );
          }
          return null;
        })}
        {/*for rendering completed state next*/}
        {notes.map((noteItem, index) => {
          if (
            mode === "all" ||
            (mode === "active" && noteItem.active) ||
            (mode === "completed" && !noteItem.active)
          ) {
            if (!noteItem.active)
              return (
                <Todos
                  key={index}
                  id={index}
                  content={noteItem.content}
                  active={noteItem.active}
                  uname={noteItem.uname}
                  onDelete={deleteNote}
                  onCompleted={completedNote}
                />
              );
          }
          return null;
        })}
        <UtilCard remaining={noActiveNotes} clearCompleted={clearCompleted} />
        <StateCard onModeChange={modeChange} currentMode={mode} />
      </div>
    </div>
  );
}

export default Task;
