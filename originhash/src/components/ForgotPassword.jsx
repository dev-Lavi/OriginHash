import { FaEnvelope, FaGoogle } from "react-icons/fa";
import illustration from "../assets/illustarion.png";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#6C4CFF]/50 to-[#edeef7]/60 p-4 relative">
      {/* Circles only visible on laptop/desktop */}
      <span className="forgot-circle absolute z-0"
        style={{
          width: '9vw',
          height: '9vw',
          minWidth: '60px',
          minHeight: '60px',
          maxWidth: '120px',
          maxHeight: '120px',
          borderRadius: '50%',
          background: 'white',
          opacity: 0.8,
          boxShadow: '0 0 40px 0 #e0e7ff',
          top: '31%',
          left: '16%',
          transform: 'translate(-110%, -110%)'
        }}
      ></span>
      <span className="forgot-circle absolute z-0"
        style={{
          width: '9vw',
          height: '9vw',
          minWidth: '60px',
          minHeight: '60px',
          maxWidth: '120px',
          maxHeight: '120px',
          borderRadius: '50%',
          background: '#735FFF',
          opacity: 0.7,
          boxShadow: '0 0 40px 0 #7568ff44',
          bottom: '29%',
          right: '16%',
          transform: 'translate(110%, 110%)'
        }}
      ></span>

      <div className="bg-white rounded-3xl shadow-xl w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 overflow-hidden relative z-10">
        {/* Right Illustration Section */}
        <div className="bg-[#735fff] hidden md:flex items-center justify-center relative">
          <img
            src={illustration}
            alt="Illustration"
            className="w-[48%] max-w-md drop-shadow-xl rounded-2xl"
          />
        </div>

        {/* Left Form Section */}
        <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10">
          <h2 className="text-3xl font-bold text-center mb-2">
            FORGOT PASSWORD
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Enter your email and we'll send you a reset link
          </p>

          <form className="space-y-4">
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-3 rounded-xl">
              <FaEnvelope className="text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent w-full outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#6C4CFF] hover:bg-[#5c3fe0] text-white py-3 rounded-xl shadow-md font-semibold transition"
            >
              Send Reset Link
            </button>
          </form>

          {/* Additional Links Section */}
          <div className="mt-8 flex flex-col items-center space-y-3">
            <button
              className="text-[#6C4CFF] font-semibold hover:underline transition"
              type="button"
              onClick={() => navigate("/")}
            >
              Back to Login
            </button>
            <p className="text-gray-600">
              Need an account?
              <button
                className="ml-2 text-[#6C4CFF] font-semibold hover:underline transition"
                type="button"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
