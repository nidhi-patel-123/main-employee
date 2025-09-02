import React, { useState } from "react";
import { Edit2, Save, X } from "lucide-react";

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Sarah Johnson",
    employeeId: "EMP001",
    email: "sarah.johnson@example.com",
    phone: "+91 9876543210",
    department: "Engineering",
    position: "Frontend Developer",
    joinDate: "May 1, 2023",
    address: "Bangalore, India",
    avatar: "https://i.pravatar.cc/150?img=32",
  });

  const [form, setForm] = useState(profile);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setProfile(form);
    setIsEditing(false);
  };

  return (
    <div className="p-6">

      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Profile</h2>
        {/* Top Section */}
        <div className="flex items-center gap-6 mb-6">
          <img
            src={profile.avatar}
            alt="profile"
            className="w-28 h-28 rounded-full shadow-md border-2 border-indigo-500"
          />
          <div>
            <h3 className="text-xl font-semibold">{profile.name}</h3>
            <p className="text-gray-600">ID: {profile.employeeId}</p>
            <p className="text-indigo-600 font-medium">{profile.position}</p>
            <p className="text-gray-500 text-sm">
              Joined on {profile.joinDate}
            </p>
          </div>
        </div>

        {/* Editable Form / Details */}
        <div className="space-y-4">
          {isEditing ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="mt-1 w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="mt-1 w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="mt-1 w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Department</label>
                  <input
                    type="text"
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    className="mt-1 w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium">Address</label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    rows="2"
                    className="mt-1 w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700"
                >
                  <Save size={18} /> Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600"
                >
                  <X size={18} /> Cancel
                </button>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{profile.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{profile.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="font-medium">{profile.department}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Position</p>
                <p className="font-medium">{profile.position}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">{profile.address}</p>
              </div>
            </div>
          )}
        </div>

        {/* Edit Button */}
        {!isEditing && (
          <div className="mt-6">
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
            >
              <Edit2 size={18} /> Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
