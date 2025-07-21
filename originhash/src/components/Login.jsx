import { FaUser, FaLock, FaGoogle } from "react-icons/fa";
import illustration from "../assets/illustarion.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  // State hooks for login form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Please fill in all fields");

    const payload = {
      email,
      password,
    };

    try {
      setLoading(true);
      const res = await axios.post("https://originhash.onrender.com/api/v1/users/login", payload);
      const { token, user, success } = res.data;

      if (success) {
        // Store data in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        alert("Login successful!");
        navigate("/dashboard"); // or wherever you'd like to redirect
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#edeef7] to-[#e0e7ff] p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-5xl grid md:grid-cols-2 overflow-hidden">
        {/* Left Form Section */}
        <div className="flex flex-col justify-center p-10">
          <h2 className="text-3xl font-bold text-center mb-2">Welcome back!</h2>
          <p className="text-center text-gray-500 mb-6">
            Please enter your credentials to Login
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-3 rounded-xl">
              <FaUser className="text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent w-full outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 bg-gray-100 px-4 py-3 rounded-xl">
              <FaLock className="text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                className="bg-transparent w-full outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#6C4CFF] hover:bg-[#5c3fe0] text-white py-3 rounded-xl shadow-md font-semibold transition"
            >
              {loading ? "Logging in..." : "Login Now"}
            </button>
          </form>

          <div className="my-6 flex items-center justify-center">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 font-semibold text-gray-600 text-sm">
              Login with Others
            </span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <div className="space-y-3">
            <button className="w-full border border-gray-300 flex items-center justify-center gap-3 py-2 rounded-xl hover:bg-gray-50 transition">
              <FaGoogle className="text-xl text-red-500" />
              <span>Login with Google</span>
            </button>
          </div>

          {/* Additional Links Section */}
          <div className="mt-8 flex flex-col items-center space-y-3">
            <button
              className="text-[#6C4CFF] font-semibold hover:underline transition"
              type="button"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot password?
            </button>
            <p className="text-gray-600">
              Don't have an account yet?
              <button
                className="ml-2 text-[#6C4CFF] font-semibold hover:underline transition"
                type="button"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register
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

export default Login;
