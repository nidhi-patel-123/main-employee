import React, { useState } from "react";

export default function Attendance() {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  // Clock In
  const handleClockIn = () => {
    if (!checkIn) {
      setCheckIn(new Date());
      setCheckOut(null); // नया दिन शुरू हुआ तो पुराना clear
    }
  };

  // Clock Out
  const handleClockOut = () => {
    if (checkIn && !checkOut) {
      setCheckOut(new Date());
    }
  };

  // Working Hours
  const calculateWorkingHours = () => {
    if (!checkIn || !checkOut) return "—";
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffMs = end - start;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  // Status
  const getStatus = () => {
    if (!checkIn) return "Not Checked In";
    if (checkIn && !checkOut) return "Working";
    return "Completed";
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        My Attendance
      </h2>

      <div className="space-y-4">
        {/* Check In */}
        <div>
          <p className="font-semibold">Check In:</p>
          <p className="text-gray-700">
            {checkIn ? new Date(checkIn).toLocaleTimeString() : "—"}
          </p>
        </div>

        {/* Check Out */}
        <div>
          <p className="font-semibold">Check Out:</p>
          <p className="text-gray-700">
            {checkOut ? new Date(checkOut).toLocaleTimeString() : "—"}
          </p>
        </div>

        {/* Working Hours */}
        <div>
          <p className="font-semibold">Working Hours:</p>
          <p className="text-gray-700">{calculateWorkingHours()}</p>
        </div>

        {/* Status */}
        <div>
          <p className="font-semibold">Status:</p>
          <span
            className={`px-3 py-1 rounded text-sm ${
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
          disabled={!!checkIn && !checkOut} // अगर already working है तो दुबारा clock in न हो
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Clock In
        </button>
        <button
          onClick={handleClockOut}
          disabled={!checkIn || !!checkOut} // अगर clock in नहीं किया तो clock out नहीं होगा
          className="px-4 py-2 bg-indigo-500 text-white rounded disabled:opacity-50"
        >
          Clock Out
        </button>
      </div>
    </div>
  );
}
