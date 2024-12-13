import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check and apply the saved dark mode preference on initial load
  useEffect(() => {
    const storedPreference = localStorage.getItem("theme") === "dark";
    setIsDarkMode(storedPreference);
    if (storedPreference) {
      document.documentElement.classList.add("dark"); // Apply dark mode class to root
    } else {
      document.documentElement.classList.remove("dark"); // Remove dark mode class if not dark
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");

    // Toggle the dark class on the root element to apply global dark mode
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <>
      <nav className=" flex items-center justify-around space-x-4 bg-slate-300 dark:bg-slate-800">
        <Link to="/" className="text-lg font-bold">
          PV's Product
        </Link>
        <aside className="p-3 flex justify-around space-x-2">
          <Link to="/create">
            <button className="p-2 rounded-lg transition-all duration-300 bg-gray-600 text-white dark:bg-gray-800 dark:text-yellow-300">
              <CiSquarePlus />
            </button>
          </Link>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg transition-all duration-300 bg-gray-600 text-white  dark:bg-gray-800 dark:text-yellow-300"
          >
            {isDarkMode ? <IoMoon /> : <LuSun />}
          </button>
        </aside>
      </nav>
    </>
  );
};

export default Navbar;
