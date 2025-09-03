import React, { useState, useEffect } from "react";
import { Edit2, Save, X } from "lucide-react";
import axios from "axios"; // 🔹 ready for backend

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  // 🔹 Load profile data from backend (dummy for now)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // const res = await axios.get("/api/profile/me");
        // setProfile(res.data);
        // setForm(res.data);

        // Dummy Data (replace with API)
        const dummy = {
          name: "Sarah Johnson",
          employeeId: "EMP001",
          email: "sarah.johnson@example.com",
          phone: "+91 9876543210",
          department: "Engineering",
          position: "Frontend Developer",
          joinDate: "May 1, 2023",
          address: "Bangalore, India",
          avatar: "https://i.pravatar.cc/150?img=32",
        };
        setProfile(dummy);
        setForm(dummy);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // const res = await axios.put("/api/profile/update", form);
      // setProfile(res.data);

      setProfile(form); // 🔹 Dummy update
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!profile) return <p className="p-6">Loading profile...</p>;

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
            <p className="text-gray-500 text-sm">Joined on {profile.joinDate}</p>
          </div>
        </div>

        {/* Editable Form / Details */}
        <div className="space-y-4">
          {isEditing ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Full Name" name="name" value={form.name} onChange={handleChange} />
                <InputField label="Email" name="email" value={form.email} onChange={handleChange} type="email" />
                <InputField label="Phone" name="phone" value={form.phone} onChange={handleChange} />
                <InputField label="Department" name="department" value={form.department} onChange={handleChange} />
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
                  disabled={loading}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 disabled:opacity-50"
                >
                  <Save size={18} /> {loading ? "Saving..." : "Save"}
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
              <Detail label="Email" value={profile.email} />
              <Detail label="Phone" value={profile.phone} />
              <Detail label="Department" value={profile.department} />
              <Detail label="Position" value={profile.position} />
              <div className="col-span-2">
                <Detail label="Address" value={profile.address} />
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

/* 🔹 Small Reusable Components */
const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 w-full border rounded-lg px-3 py-2"
    />
  </div>
);

const Detail = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

export default MyProfile;
