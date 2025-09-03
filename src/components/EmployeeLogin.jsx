// import React, { useState } from "react";
// import axios from "axios"; // 🔹 Backend connect karne ke liye ready

// const EmployeeLogin = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     phone: "",
//   });
//   const [loading, setLoading] = useState(false);

//   // 🔹 Input change handler
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // 🔹 Submit handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (!formData.email || !formData.password || (!isLogin && !formData.phone)) {
//       alert("⚠️ Please fill all fields");
//       return;
//     }

//     setLoading(true);
//     try {
//       if (isLogin) {
//         // 🔹 Login API call
//         // const res = await axios.post("/api/auth/login", {
//         //   email: formData.email,
//         //   password: formData.password,
//         // });
//         // console.log(res.data);

//         alert("✅ Login successful!");
//       } else {
//         // 🔹 Signup API call
//         // const res = await axios.post("/api/auth/signup", formData);
//         // console.log(res.data);

//         alert("✅ Account created successfully!");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("❌ Something went wrong!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-600 to-blue-100 px-4">
//       <div className="w-full max-w-md">
//         {/* Card */}
//         <div className="bg-white shadow-xl rounded-3xl p-8">
//           <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//             {isLogin ? "Sign in" : "Sign up"}
//           </h2>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
//             />
//             {!isLogin && (
//               <input
//                 type="text"
//                 name="phone"
//                 placeholder="Phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
//               />
//             )}

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
//             >
//               {loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
//             </button>
//           </form>

//           {/* Forgot Password (only in login) */}
//           {isLogin && (
//             <p className="text-sm text-right mt-2">
//               <a href="/forgot-password" className="text-blue-600 hover:underline">
//                 Forgot your password?
//               </a>
//             </p>
//           )}

//           {/* Divider */}
//           <div className="flex items-center my-6">
//             <div className="flex-grow border-t border-gray-300"></div>
//             <span className="px-2 text-gray-400 text-sm">OR</span>
//             <div className="flex-grow border-t border-gray-300"></div>
//           </div>

//           {/* Switch Mode */}
//           <p className="text-center text-sm mt-6 text-gray-600">
//             {isLogin ? (
//               <>
//                 Don’t have an account?{" "}
//                 <button
//                   type="button"
//                   onClick={() => setIsLogin(false)}
//                   className="text-blue-600 font-semibold hover:underline"
//                 >
//                   Sign up
//                 </button>
//               </>
//             ) : (
//               <>
//                 Already have an account?{" "}
//                 <button
//                   type="button"
//                   onClick={() => setIsLogin(true)}
//                   className="text-blue-600 font-semibold hover:underline"
//                 >
//                   Sign in
//                 </button>
//               </>
//             )}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeLogin;

import React, { useState } from 'react'

function EmployeeLogin() {

  const [isLoginMode, setIsLoginMode] = useState(true)
  return (
    <div className='w-[450px] bg-white p-8 rounded-2xl shadow-lg'>
      {/* Header title */}
      <div className='flex justify-center mb-4'>
        <h2 className='text-3xl font-semibold text-center'>{isLoginMode ? "Login" : "Sign Up"}</h2>
      </div>

      {/* Tab Controls */}

      <div className='relative flex h-12 mb-6 border border-gray-300  rounded-full overflow-hidden'>
        <button onClick={() => setIsLoginMode(true)} className={`w-1/2 text-lg font-medium transition-all z-10 ${isLoginMode ? "text-white" : "text-black"}`}>
          Login
        </button>
        <button onClick={()=> setIsLoginMode(false)} className={`w-1/2 text-lg font-medium transition-all z-10 ${!isLoginMode ? "text-white" : "text-black"}`}>
          Sign Up
        </button>
        <div className={`absolute top-0 h-full w-1/2 rounded-full bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-200 ${isLoginMode ? "left-0" : "left-1/2"}`}></div>
      </div>

      {/* Form Section */}

      <form className='space-y-4'>
        { !isLoginMode && (
          <input type="text" placeholder='Name' required className='w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400' />
        )}

        {/* Shared inout field */}
        <input type="email" placeholder='Email Address' required className='w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400' />
        <input type="password" placeholder='Password' required className='w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400' />

        {/* Signup field */}
        {!isLoginMode && (
          <input type="password" placeholder='Confirm Password' required className='w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400' />
        )}

        {/* Forget password for login */}
        {isLoginMode && (
          <div className='text-right'>
            <p className='text-cyan-600 hover:underline'>Forget Password</p>
          </div>
        )}

        {/* Shared button */}
        <button className='w-full p-3 bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-200 text-white rounded-full text-lg font-mediam hover:opacity-90 transition'>
          {isLoginMode ? "Login" : "SignUp"}
        </button>

        {/* Switch link */}
        <p className='text-center text-gray-600'>{isLoginMode ? "Don't have an account" : "Already have an account"}
          <a href="#" onClick={(e)=> setIsLoginMode(!isLoginMode)} className='text-cyan-600 hover:underline'>
            {isLoginMode ? "Signup now" : "Login"}
          </a>
           </p>
      </form>


    </div>
  )
}

export default EmployeeLogin
