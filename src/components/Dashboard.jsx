import React, { useState, useEffect } from "react";
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
  const [leaves, setLeaves] = useState([]);
  const [projects, setProjects] = useState([]);
  const [attendance, setAttendance] = useState(null);
  const [salaryStatus, setSalaryStatus] = useState("");

  // 🔹 API Call Placeholder (abhi dummy data, baad me API call laga dena)
  useEffect(() => {
    // Example: Replace with API call
    // fetch("/api/dashboard").then(res => res.json()).then(data => { ... });

    setAttendance(95);
    setSalaryStatus("Paid");

    setLeaves([
      { id: 1, date: "2025-08-20", type: "Sick Leave", status: "Approved" },
      { id: 2, date: "2025-08-28", type: "Casual Leave", status: "Pending" },
    ]);

    setProjects([
      { id: 1, name: "Website Redesign", deadline: "2025-09-15", status: "In Progress" },
      { id: 2, name: "Mobile App", deadline: "2025-10-01", status: "Assigned" },
    ]);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1">
        {/* Dashboard Cards */}
        <section className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card title="My Attendance" value={`${attendance ?? "--"}%`} />
          <Card title="Leaves Taken" value={leaves.length} />
          <Card title="Projects Assigned" value={projects.length} />
          <Card
            title="Salary Status"
            value={salaryStatus || "--"}
            valueClass="text-green-600"
          />
        </section>

        {/* Recent Leaves */}
        <section className="p-6">
          <Table
            title="My Leaves"
            headers={["Date", "Type", "Status"]}
            data={leaves.map((leave) => [
              leave.date,
              leave.type,
              <StatusBadge
                key={leave.id}
                label={leave.status}
                type={leave.status === "Approved" ? "success" : "warning"}
              />,
            ])}
          />
        </section>

        {/* Assigned Projects */}
        <section className="p-6">
          <Table
            title="My Projects"
            headers={["Project", "Deadline", "Status"]}
            data={projects.map((proj) => [
              proj.name,
              proj.deadline,
              <StatusBadge
                key={proj.id}
                label={proj.status}
                type={proj.status === "In Progress" ? "info" : "neutral"}
              />,
            ])}
          />
        </section>
      </main>
    </div>
  );
}

/* 🔹 Reusable Card Component */
function Card({ title, value, valueClass = "" }) {
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h3 className="text-gray-500">{title}</h3>
      <p className={`text-2xl font-bold ${valueClass}`}>{value}</p>
    </div>
  );
}

/* 🔹 Reusable Table Component */
function Table({ title, headers, data }) {
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            {headers.map((head, i) => (
              <th key={i} className="p-3">{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              {row.map((cell, j) => (
                <td key={j} className="p-3">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* 🔹 Status Badge Component */
function StatusBadge({ label, type }) {
  const styles = {
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    info: "bg-blue-100 text-blue-700",
    neutral: "bg-gray-100 text-gray-700",
  };

  return (
    <span className={`px-2 py-1 text-sm rounded-full ${styles[type] || ""}`}>
      {label}
    </span>
  );
}
