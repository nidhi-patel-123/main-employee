import React, { useState } from "react";

export default function Setting() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [formData, setFormData] = useState({
    logo: null,
    companyName: "Acme Corporation",
    email: "admin@acmecorp.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Ave, Suite 100, San Francisco, CA 94107",
    website: "https://acmecorp.com",
    timezone: "Pacific Time (US & Canada)",
    language: "English (US)",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorAuth: false,
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
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Tabs */}
      <div className="flex gap-4 border-b mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-t-lg font-medium transition-all ${
              activeTab === tab
                ? "bg-white shadow text-blue-600 border border-b-0 border-gray-200"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        {/* PROFILE */}
        {activeTab === "Profile" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Logo Upload */}
            <div>
              <label className="block mb-2 font-medium">Company Logo</label>
              {formData.logo && (
                <img
                  src={formData.logo}
                  alt="Logo"
                  className="h-16 w-16 rounded-lg mb-3 border"
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
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <InputField label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} />
            <InputField label="Website" name="website" type="url" value={formData.website} onChange={handleChange} />
            <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
            <SelectField label="Timezone" name="timezone" value={formData.timezone} onChange={handleChange} options={["Pacific Time (US & Canada)", "Eastern Time (US & Canada)", "Central Time (US & Canada)", "India Standard Time"]} />
            <InputField label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
            <SelectField label="Language" name="language" value={formData.language} onChange={handleChange} options={["English (US)", "English (UK)", "Hindi", "Spanish"]} />
          </div>
        )}

        {/* SECURITY */}
        {activeTab === "Security" && (
          <div className="max-w-md space-y-5">
            <InputField label="Current Password" type="password" name="currentPassword" value={formData.currentPassword} onChange={handleChange} />
            <InputField label="New Password" type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} />
            <InputField label="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />

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
        )}

        {/* NOTIFICATIONS */}
        {activeTab === "Notifications" && (
          <div className="max-w-md space-y-4">
            <ToggleField label="Email Notifications" name="emailNotif" checked={formData.emailNotif} onChange={handleChange} />
            <ToggleField label="SMS Notifications" name="smsNotif" checked={formData.smsNotif} onChange={handleChange} />
            <ToggleField label="Push Notifications" name="pushNotif" checked={formData.pushNotif} onChange={handleChange} />
          </div>
        )}

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            Save {activeTab} Settings
          </button>
        </div>
      </div>
    </div>
  );
}

/* Reusable Input */
const InputField = ({ label, name, type = "text", value, onChange }) => (
  <div>
    <label className="block mb-2 font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

/* Reusable Select */
const SelectField = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="block mb-2 font-medium">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
    >
      {options.map((opt) => (
        <option key={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

/* Reusable Toggle */
const ToggleField = ({ label, name, checked, onChange }) => (
  <div className="flex items-center justify-between border p-3 rounded-lg hover:bg-gray-50 transition">
    <span>{label}</span>
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className="h-5 w-5 text-blue-600"
    />
  </div>
);
