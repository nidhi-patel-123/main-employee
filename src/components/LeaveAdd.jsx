import React, { useState, useEffect } from "react";
// import axios from "axios"; // ✅ Jab backend ready ho tab use karna

export default function EmployeeLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    type: "Sick Leave",
    from: "",
    to: "",
    description: "",
  });

  // ✅ Fetch Leaves from Backend (initial load)
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        setLoading(true);
        // const { data } = await axios.get("/api/leaves");
        // setLeaves(data);
        console.log("📡 GET /api/leaves");
      } catch (error) {
        console.error("Fetch Leaves Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Submit new leave
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.from || !form.to || !form.description) {
      alert("Please fill all fields!");
      return;
    }

    const newLeave = {
      type: form.type,
      from: form.from,
      to: form.to,
      description: form.description,
      status: "Pending",
      employeeId: "EMP001", // TODO: login user id se lena
    };

    try {
      setLoading(true);
      // const { data } = await axios.post("/api/leaves", newLeave);
      // setLeaves([...leaves, data]);
      console.log("📡 POST /api/leaves", newLeave);

      // Frontend dummy update
      setLeaves([...leaves, { id: leaves.length + 1, ...newLeave }]);
      setForm({ type: "Sick Leave", from: "", to: "", description: "" });
      setShowForm(false);
    } catch (error) {
      console.error("Submit Leave Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Leaves</h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-5 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-700"
        >
          Apply for Leave
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        {loading ? (
          <p className="text-center py-6 text-gray-500">Loading...</p>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">SNo</th>
                <th className="p-3 border">Leave Type</th>
                <th className="p-3 border">From</th>
                <th className="p-3 border">To</th>
                <th className="p-3 border">Description</th>
                <th className="p-3 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave, index) => (
                <tr key={leave.id} className="text-center hover:bg-gray-50">
                  <td className="p-3 border">{index + 1}</td>
                  <td className="p-3 border">{leave.type}</td>
                  <td className="p-3 border">{leave.from}</td>
                  <td className="p-3 border">{leave.to}</td>
                  <td className="p-3 border">{leave.description}</td>
                  <td className="p-3 border">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        leave.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : leave.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>
                </tr>
              ))}
              {leaves.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No leaves found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl">
            <h3 className="text-xl font-semibold mb-6">Apply for Leave</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Leave Type */}
              <div>
                <label className="block text-sm font-medium mb-1">Leave Type</label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="Annual Leave">Annual Leave</option>
                  <option value="Unpaid Leave">Unpaid Leave</option>
                </select>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">From Date</label>
                  <input
                    type="date"
                    name="from"
                    value={form.from}
                    onChange={handleChange}
                    className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">To Date</label>
                  <input
                    type="date"
                    name="to"
                    value={form.to}
                    onChange={handleChange}
                    className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-1">Reason / Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter reason for leave"
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
