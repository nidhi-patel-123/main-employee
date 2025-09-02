import React, { useState } from "react";

export default function Setting() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [formData, setFormData] = useState({
    // Profile
    logo: null,
    companyName: "Acme Corporation",
    email: "admin@acmecorp.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Ave, Suite 100, San Francisco, CA 94107",
    website: "https://acmecorp.com",
    timezone: "Pacific Time (US & Canada)",
    language: "English (US)",

    // Security
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorAuth: false,

    // Notifications
    emailNotif: true,
    smsNotif: false,
    pushNotif: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, logo: URL.createObjectURL(file) }));
    }
  };

  const handleSave = () => {
    alert(`${activeTab} changes saved successfully!`);
    console.log("Saved Data:", formData);
  };

  const tabs = ["Profile", "Security", "Notifications"];

  return (
    <div className="p-6">
      {/* Tabs */}
      <div className="flex border-b mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 -mb-px border-b-2 font-medium transition-colors ${activeTab === tab
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-blue-600"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* PROFILE TAB */}
      {activeTab === "Profile" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Logo */}
            <div>
              <label className="block mb-2 font-medium">Company Logo</label>
              {formData.logo && (
                <img
                  src={formData.logo}
                  alt="Company Logo"
                  className="h-16 w-16 rounded mb-3"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="block w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 
                           file:rounded-lg file:border-0 file:text-sm 
                           file:font-semibold file:bg-blue-50 file:text-blue-600 
                           hover:file:bg-blue-100"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Timezone</label>
              <select
                name="timezone"
                value={formData.timezone}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              >
                <option>Pacific Time (US & Canada)</option>
                <option>Eastern Time (US & Canada)</option>
                <option>Central Time (US & Canada)</option>
                <option>India Standard Time</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Language</label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              >
                <option>English (US)</option>
                <option>English (UK)</option>
                <option>Hindi</option>
                <option>Spanish</option>
              </select>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </>
      )}

      {/* SECURITY TAB */}
      {activeTab === "Security" && (
        <>
          <div className="max-w-md space-y-4">
            <div>
              <label className="block mb-2 font-medium">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
            </div>

            <div className="flex items-center gap-3 mt-4">
              <input
                type="checkbox"
                name="twoFactorAuth"
                checked={formData.twoFactorAuth}
                onChange={handleChange}
                className="h-5 w-5 text-blue-600 rounded"
              />
              <label className="font-medium">Enable Two-Factor Authentication</label>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Save Security Settings
            </button>
          </div>
        </>
      )}

      {/* NOTIFICATIONS TAB */}
      {activeTab === "Notifications" && (
        <>
          <div className="max-w-md space-y-4">
            <div className="flex items-center justify-between border p-3 rounded-lg">
              <span>Email Notifications</span>
              <input
                type="checkbox"
                name="emailNotif"
                checked={formData.emailNotif}
                onChange={handleChange}
                className="h-5 w-5 text-blue-600"
              />
            </div>

            <div className="flex items-center justify-between border p-3 rounded-lg">
              <span>SMS Notifications</span>
              <input
                type="checkbox"
                name="smsNotif"
                checked={formData.smsNotif}
                onChange={handleChange}
                className="h-5 w-5 text-blue-600"
              />
            </div>

            <div className="flex items-center justify-between border p-3 rounded-lg">
              <span>Push Notifications</span>
              <input
                type="checkbox"
                name="pushNotif"
                checked={formData.pushNotif}
                onChange={handleChange}
                className="h-5 w-5 text-blue-600"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Save Notification Settings
            </button>
          </div>
        </>
      )}

    </div>
  );
}
