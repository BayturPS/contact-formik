import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import "../App.css";
import Home from "./Home";
import AddEdit from "./AddEdit";
import View from "./View";
import About from "./About";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";

function DataApp() {
  return (
    <HashRouter>
      <div className="App">
        <Header />
        <ToastContainer position="top-center" />
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="add" element={<AddEdit />} />
          <Route path="update/:id" element={<AddEdit />} />
          <Route path="view/:id" element={<View />} />
          <Route path="about" element={<About />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default DataApp;
