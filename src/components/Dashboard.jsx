import React, { useState } from "react";
import {
  UserIcon,
  ClipboardDocumentCheckIcon,
  CalendarDaysIcon,
  BriefcaseIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  BellIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  const [leaves] = useState([
    { id: 1, date: "2025-08-20", type: "Sick Leave", status: "Approved" },
    { id: 2, date: "2025-08-28", type: "Casual Leave", status: "Pending" },
  ]);

  const [projects] = useState([
    { id: 1, name: "Website Redesign", deadline: "2025-09-15", status: "In Progress" },
    { id: 2, name: "Mobile App", deadline: "2025-10-01", status: "Assigned" },
  ]);

  return (
    <div className="flex min-h-screen bg-gray-100">
     

      {/* Main Content */}
      <main className="flex-1">


        {/* Dashboard Cards */}
        <section className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-gray-500">My Attendance</h3>
            <p className="text-2xl font-bold">95%</p>
          </div>
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-gray-500">Leaves Taken</h3>
            <p className="text-2xl font-bold">{leaves.length}</p>
          </div>
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-gray-500">Projects Assigned</h3>
            <p className="text-2xl font-bold">{projects.length}</p>
          </div>
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-gray-500">Salary Status</h3>
            <p className="text-2xl font-bold text-green-600">Paid</p>
          </div>
        </section>

        {/* Recent Leaves */}
        <section className="p-6">
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">My Leaves</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3">Date</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave) => (
                  <tr key={leave.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{leave.date}</td>
                    <td className="p-3">{leave.type}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 text-sm rounded-full ${leave.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        {leave.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Assigned Projects */}
        <section className="p-6">
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">My Projects</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3">Project</th>
                  <th className="p-3">Deadline</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((proj) => (
                  <tr key={proj.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{proj.name}</td>
                    <td className="p-3">{proj.deadline}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 text-sm rounded-full ${proj.status === "In Progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                          }`}
                      >
                        {proj.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
