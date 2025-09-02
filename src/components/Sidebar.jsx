import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from 'react-icons/cg';

import {
  HomeIcon,
  UserGroupIcon,
  CalendarIcon,
  BriefcaseIcon,
  Cog6ToothIcon,
  ClipboardDocumentListIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  BuildingOfficeIcon,
  PlusIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  const [openEmployees, setOpenEmployees] = useState(false);

  const menu = [
    { name: "Dashboard", icon: <HomeIcon className="h-8 w-8 " />, path: "/" },
    { name: "My-profile", icon: <CgProfile className="h-8 w-8 " />, path: "/my-profile" },
    { name: "Add-Attendance", icon: <ClipboardDocumentListIcon className="h-8 w-8" />, path: "/attendance" },
    { name: "Add-Leave", icon: <CalendarIcon className="h-8 w-8" />, path: "/leave" },
    { name: "Projects", icon: <BriefcaseIcon className="h-8 w-8" />, path: "/projects" },
    { name: "PayrollList", icon: <CurrencyDollarIcon className="h-8 w-8" />, path: "/payroll" },
    { name: "Settings", icon: <Cog6ToothIcon className="h-8 w-8" />, path: "/settings" },
  ];

  return (
    <div className="w-64 bg-white shadow-lg flex flex-col h-screen sticky top-0">
      <div className="p-5 text-2xl font-bold text-blue-600 tracking-wide border-b">Welcome Name</div>
      <nav className="flex-1 overflow-y-auto">
        {menu.map((item, index) =>
          item.dropdown ? (
            <div key={index} className="border-b">
              <button
                onClick={() => setOpenEmployees(!openEmployees)}
                className="flex items-center justify-between w-full px-6 py-3 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
              >
                <span className="flex items-center gap-3">
                  {item.icon}
                  {item.name}
                </span>
              </button>
              {openEmployees && (
                <div className="pl-14 bg-gray-50 transition-all duration-300">
                  {item.dropdown.map((sub, i) => (
                    <Link
                      key={i}
                      to={sub.path}
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      {sub.icon}
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              key={index}
              to={item.path}
              className="flex items-center gap-3 w-full px-6 py-3 text-gray-600 hover:bg-blue-100 hover:text-blue-600 text-left transition-colors"
            >
              {item.icon}
              {item.name}
            </Link>
          )
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
