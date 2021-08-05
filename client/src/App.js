import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';

import Login from './components/Login';
import Task from './components/Task';
import CreateRoom from './components/CreateRoom';

function App(){
    return(
        <Router>
            <Route path="/" exact component = {Login}/>
            <Route path="/createroom" exact component = {CreateRoom}/>
            <Route path="/task" component = {Task}/>
        </Router>
    )
}

export default App;