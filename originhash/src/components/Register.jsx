import { FaUser, FaLock, FaEnvelope, FaGoogle } from "react-icons/fa";
import illustration from "../assets/illustarion.png";
import { useNavigate } from "react-router-dom"; // Add this import
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate(); // Add this line
  const [userType, setUserType] = useState(""); // Add state

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#edeef7] to-[#e0e7ff] p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-5xl grid md:grid-cols-2 overflow-hidden">
        {/* Left Form Section */}
        <div className="flex flex-col justify-center p-10">
          <h2 className="text-3xl font-bold text-center mb-2">REGISTER</h2>
          <p className="text-center text-gray-500 mb-6">
            Create your account to get started
          </p>

          <form className="space-y-4">
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-3 rounded-xl">
              <FaUser className="text-gray-400" />
              <input
                type="text"
                placeholder="Full Name"
                className="bg-transparent w-full outline-none"
              />
            </div>

            <div className="flex items-center gap-2 bg-gray-100 px-4 py-3 rounded-xl">
              <FaEnvelope className="text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent w-full outline-none"
              />
            </div>

            <div className="flex items-center gap-2 bg-gray-100 px-4 py-3 rounded-xl">
              <FaLock className="text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                className="bg-transparent w-full outline-none"
              />
            </div>

            {/* User Type Checkboxes */}
            <div className="flex items-center justify-center gap-8 rounded-2xl border border-[#e0e7ff] bg-white py-3 px-4 mt-2 mb-2">
              <label className="flex items-center gap-2 font-semibold text-gray-700">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-2 border-[#a5b4fc] focus:ring-0"
                  name="userType"
                  value="admin"
                  checked={userType === "admin"}
                  onChange={() => setUserType("admin")}
                />
                Admin
              </label>
              <label className="flex items-center gap-2 font-semibold text-gray-700">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-2 border-[#a5b4fc] focus:ring-0"
                  name="userType"
                  value="corporate"
                  checked={userType === "corporate"}
                  onChange={() => setUserType("corporate")}
                />
                Corporate
              </label>
              <label className="flex items-center gap-2 font-semibold text-gray-700">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-2 border-[#a5b4fc] focus:ring-0"
                  name="userType"
                  value="individual"
                  checked={userType === "individual"}
                  onChange={() => setUserType("individual")}
                />
                Individual
              </label>
            </div>
            {/* End User Type Checkboxes */}

            <button
              type="submit"
              className="w-full bg-[#6C4CFF] hover:bg-[#5c3fe0] text-white py-3 rounded-xl shadow-md font-semibold transition"
            >
              Register Now
            </button>
          </form>

          <div className="my-6 flex items-center justify-center">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 font-semibold text-gray-600 text-sm">
              Or Sign Up with
            </span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <div className="space-y-3">
            <button className="w-full border border-gray-300 flex items-center justify-center gap-3 py-2 rounded-xl hover:bg-gray-50 transition">
              <FaGoogle className="text-xl text-red-500" />
              <span>Register with Google</span>
            </button>
          </div>

          {/* Additional Links Section */}
          <div className="mt-8 flex flex-col items-center space-y-3">
            <p className="text-gray-600">
              Already have an account?
              <button
                className="ml-2 text-[#6C4CFF] font-semibold hover:underline transition"
                type="button"
                onClick={() => {
                  navigate("/");
                }}
              >
                Login
              </button>
            </p>
          </div>
        </div>

        {/* Right Illustration Section */}
        <div className="bg-[#735fff] hidden md:flex items-center justify-center relative">
          <img
            src={illustration}
            alt="Illustration"
            className="w-[60%] max-w-md drop-shadow-xl rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
