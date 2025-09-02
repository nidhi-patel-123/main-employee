import React, { useState } from "react";

const EmployeeLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      // login validation
      if (!formData.email || !formData.password) {
        alert("Please fill all fields");
        return;
      }
      alert("✅ Login successful!");
    } else {
      // signup validation
      if (!formData.email || !formData.password || !formData.phone) {
        alert("Please fill all fields");
        return;
      }
      alert("✅ Account created successfully!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-600 to-blue-100 px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white shadow-xl rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            {isLogin ? "Sign in" : "Sign up"}
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            {!isLogin && (
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </button>
          </form>

          {/* Forgot Password (only in login) */}
          {isLogin && (
            <p className="text-sm text-right mt-2">
              <a href="#" className="text-blue-600 hover:underline">
                Forgot your password?
              </a>
            </p>
          )}

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-2 text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Social Buttons */}
          {/* <div className="flex gap-4">
            <button className="flex-1 border rounded-lg py-2 flex items-center justify-center space-x-2 hover:bg-gray-50">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span>Google</span>
            </button>
            <button className="flex-1 border rounded-lg py-2 flex items-center justify-center space-x-2 hover:bg-gray-50">
              <img
                src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                alt="Facebook"
                className="w-5 h-5"
              />
              <span>Facebook</span>
            </button>
          </div> */}

          {/* Switch Mode */}
          <p className="text-center text-sm mt-6 text-gray-600">
            {isLogin ? (
              <>
                Don’t have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLogin;
