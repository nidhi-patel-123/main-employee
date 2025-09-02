import React, { useState } from "react";
import { Download } from "lucide-react";

const EmployeePayroll = () => {
  // sample data (normally API se aayega)
  const [payrolls] = useState([
    {
      id: 1,
      month: "August 2025",
      basic: 40000,
      allowance: 5000,
      deduction: 2000,
      net: 43000,
    },
    {
      id: 2,
      month: "July 2025",
      basic: 40000,
      allowance: 4500,
      deduction: 1800,
      net: 42700,
    },
    {
      id: 3,
      month: "June 2025",
      basic: 39000,
      allowance: 4800,
      deduction: 2200,
      net: 41600,
    },
  ]);

  const [search, setSearch] = useState("");

  // filter logic
  const filteredPayrolls = payrolls.filter((p) =>
    p.month.toLowerCase().includes(search.toLowerCase())
  );

  // fake download slip function
  const handleDownload = (month) => {
    alert(`Salary slip for ${month} downloaded ✅`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Salary</h2>

      {/* Search */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by month..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg w-64 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="px-4 py-3">Month</th>
              <th className="px-4 py-3">Basic Salary</th>
              <th className="px-4 py-3">Allowance</th>
              <th className="px-4 py-3">Deduction</th>
              <th className="px-4 py-3">Net Salary</th>
              {/* <th className="px-4 py-3 text-center">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredPayrolls.length > 0 ? (
              filteredPayrolls.map((p) => (
                <tr
                  key={p.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium">{p.month}</td>
                  <td className="px-4 py-3">₹{p.basic.toLocaleString()}</td>
                  <td className="px-4 py-3">₹{p.allowance.toLocaleString()}</td>
                  <td className="px-4 py-3 text-red-600">
                    ₹{p.deduction.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-semibold text-green-600">
                    ₹{p.net.toLocaleString()}
                  </td>
                  
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No payroll records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeePayroll;
