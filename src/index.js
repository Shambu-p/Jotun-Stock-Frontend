import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import AddCategory from "./views/Categories/add";
import Departments from "./views/Devices/departments";
import Devices from "./views/Devices/Show";
import EditDevice from "./views/Devices/edit";
import AddDevice from "./views/Devices/add";
import Error from "./views/Error";


ReactDOM.render(
    <BrowserRouter>
        <Routes>

            <Route path="/" element={<Devices />} />
            <Route path="/categories" element={<AddCategory />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/device/edit/:device_id" element={<EditDevice />} />
            <Route path="/device/add" element={<AddDevice />} />

            <Route path="*" element={<Error />} />

        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// <Route path="/" element={<MainHome />} />
// <Route path="/question" element={<Question />} />
//
// <Route path="/exam" element={<Exams />} >
//     <Route path="show" element={<ExamList />} />
//     <Route path="create" element={<CreateExam />} />
// </Route>

// <Route path="/exam_view/:exam_id" element={<Detail />} />
// <Route path="/result_view/:result_id" element={<ResultView />} />
// <Route path="/results" element={<ResultShow />} />
// <Route path="/exam_detail/:exam_id" element={<ExamView />} />
// <Route path="/login" element={<Login />} />
// <Route path="/register" element={<Registration />} />