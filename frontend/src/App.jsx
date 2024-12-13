import React from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import Navbar from "./components/Navbar.jsx";
import CreatePages from "./pages/CreatePage.jsx";
function App() {
  return (
    <>
      <div className="bg-slate-200 text-black dark:bg-gray-900 dark:text-white min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePages />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
