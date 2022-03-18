// import logo from './logo.svg';
// import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './views/Tasks/Home';
import TaskView from "./views/Tasks/TaskView";
import Error from "./views/Error";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task_view/:taskId" element={<TaskView />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
