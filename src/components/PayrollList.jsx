import React, { useState } from "react";
import { Download } from "lucide-react";

const Payroll = () => {
  // Sample data (normally API se aayega)
  const [payrolls, setPayrolls] = useState([
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

  // Filter logic
  const filteredPayrolls = payrolls.filter((p) =>
    p.month.toLowerCase().includes(search.toLowerCase())
  );

  // Fake download slip
  const handleDownload = (month) => {
    alert(`Salary slip for ${month} downloaded ✅`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Salary</h2>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by month..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg w-64 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">SNo</th>
              <th className="p-3 border">Month</th>
              <th className="p-3 border">Basic</th>
              <th className="p-3 border">Allowance</th>
              <th className="p-3 border">Deduction</th>
              <th className="p-3 border">Net Salary</th>
              <th className="p-3 border text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayrolls.length > 0 ? (
              filteredPayrolls.map((p, index) => (
                <tr key={p.id} className="text-center hover:bg-gray-50">
                  <td className="p-3 border">{index + 1}</td>
                  <td className="p-3 border font-medium">{p.month}</td>
                  <td className="p-3 border">₹{p.basic.toLocaleString()}</td>
                  <td className="p-3 border">₹{p.allowance.toLocaleString()}</td>
                  <td className="p-3 border text-red-600">
                    ₹{p.deduction.toLocaleString()}
                  </td>
                  <td className="p-3 border text-green-600 font-semibold">
                    ₹{p.net.toLocaleString()}
                  </td>
                  <td className="p-3 border text-center">
                    <button
                      onClick={() => handleDownload(p.month)}
                      className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm mx-auto"
                    >
                      <Download size={16} /> Slip
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="p-6 text-center text-gray-500"
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

export default Payroll;
