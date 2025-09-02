import React, { useState, useEffect, useRef } from "react";
import {
  BellIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

const Header = () => {
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([
    "New leave request from John Doe",
    "Project deadline approaching",
    "Employee Jane approved attendance",
  ]);

  // Sample search data (replace with API results)
  const employees = ["John Doe", "Jane Smith", "Michael Lee", "Sarah Johnson"];
  const projects = ["Payroll System", "Employee Portal", "Leave Tracker"];
  const results = [
    ...employees.filter((e) =>
      e.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    ...projects.filter((p) =>
      p.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  ];

  // Refs for dropdowns
  const notifRef = useRef(null);
  const adminRef = useRef(null);
  const searchRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setOpenNotifications(false);
      }
      if (adminRef.current && !adminRef.current.contains(event.target)) {
        setOpenAdmin(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    alert("Logging out...");
    // Add real logout logic
  };

  return (
    <header className="flex justify-between items-center bg-white shadow-md px-6 py-3 sticky top-0 z-50">
      {/* Search Bar */}
      <div className="relative w-1/3" ref={searchRef}>
        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search employees, projects..."
            className="bg-transparent outline-none px-2 w-full text-sm text-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Search Results Dropdown */}
        {searchQuery && (
          <div className="absolute mt-1 w-full bg-white border shadow-lg rounded-md max-h-60 overflow-y-auto z-50">
            {results.length > 0 ? (
              results.map((res, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    alert(`Selected: ${res}`);
                    setSearchQuery("");
                  }}
                >
                  {res}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-400">
                No results found
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <BellIcon
            className="h-6 w-6 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
            onClick={() => setOpenNotifications(!openNotifications)}
          />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {notifications.length}
            </span>
          )}

          {openNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-white border shadow-lg rounded-md overflow-hidden z-50">
              <h4 className="font-semibold text-gray-700 px-4 py-2 border-b">
                Notifications
              </h4>
              <ul className="max-h-60 overflow-y-auto">
                {notifications.map((note, idx) => (
                  <li
                    key={idx}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-600"
                  >
                    {note}
                  </li>
                ))}
              </ul>
              {notifications.length === 0 && (
                <div className="px-4 py-2 text-sm text-gray-400">
                  No notifications
                </div>
              )}
            </div>
          )}
        </div>

        {/* Admin/User */}
        <div className="relative" ref={adminRef}>
          <div
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-full px-2 py-1 transition-colors"
            onClick={() => setOpenAdmin(!openAdmin)}
          >
            <UserCircleIcon className="h-8 w-8 text-gray-600" />
            <span className="text-gray-700 font-medium text-sm">Admin</span>
          </div>

          {openAdmin && (
            <div className="absolute right-0 mt-2 w-40 bg-white border shadow-lg rounded-md overflow-hidden z-50">
              <button
                onClick={() => alert("Go to profile")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
              >
                My Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
