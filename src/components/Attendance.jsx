import React, { useState } from "react";
// import axios from "axios"; // ✅ Jab backend ready ho tab enable karna

export default function Attendance() {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Clock In
  const handleClockIn = async () => {
    if (!checkIn) {
      const now = new Date();
      setCheckIn(now);
      setCheckOut(null);

      // ✅ Backend ke liye data payload
      const payload = {
        employeeId: "EMP001", // TODO: Dynamic ID (login user se lena hoga)
        checkIn: now.toISOString(),
      };

      try {
        setLoading(true);
        // TODO: Backend call
        // await axios.post("/api/attendance/checkin", payload);
        console.log("Clock In Data:", payload);
      } catch (error) {
        console.error("Clock In Error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // ✅ Clock Out
  const handleClockOut = async () => {
    if (checkIn && !checkOut) {
      const now = new Date();
      setCheckOut(now);

      // ✅ Backend ke liye data payload
      const payload = {
        employeeId: "EMP001",
        checkIn: checkIn.toISOString(),
        checkOut: now.toISOString(),
        workingHours: calculateWorkingHours(checkIn, now),
      };

      try {
        setLoading(true);
        // TODO: Backend call
        // await axios.post("/api/attendance/checkout", payload);
        console.log("Clock Out Data:", payload);
      } catch (error) {
        console.error("Clock Out Error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // ✅ Working Hours Calculator
  const calculateWorkingHours = (start, end) => {
    if (!start || !end) return "—";
    const diffMs = new Date(end) - new Date(start);
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  // ✅ Status
  const getStatus = () => {
    if (!checkIn) return "Not Checked In";
    if (checkIn && !checkOut) return "Working";
    return "Completed";
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        My Attendance
      </h2>

      <div className="space-y-4">
        {/* Check In */}
        <div>
          <p className="font-semibold text-gray-700">Check In:</p>
          <p className="text-gray-600">
            {checkIn ? new Date(checkIn).toLocaleTimeString() : "—"}
          </p>
        </div>

        {/* Check Out */}
        <div>
          <p className="font-semibold text-gray-700">Check Out:</p>
          <p className="text-gray-600">
            {checkOut ? new Date(checkOut).toLocaleTimeString() : "—"}
          </p>
        </div>

        {/* Working Hours */}
        <div>
          <p className="font-semibold text-gray-700">Working Hours:</p>
          <p className="text-gray-600">
            {calculateWorkingHours(checkIn, checkOut)}
          </p>
        </div>

        {/* Status */}
        <div>
          <p className="font-semibold text-gray-700">Status:</p>
          <span
            className={`px-3 py-1 rounded text-sm font-medium ${
              getStatus() === "Completed"
                ? "bg-green-100 text-green-700"
                : getStatus() === "Working"
                ? "bg-blue-100 text-blue-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {getStatus()}
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6 justify-center">
        <button
          onClick={handleClockIn}
          disabled={!!checkIn && !checkOut || loading}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Clock In"}
        </button>
        <button
          onClick={handleClockOut}
          disabled={!checkIn || !!checkOut || loading}
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Clock Out"}
        </button>
      </div>
    </div>
  );
}
