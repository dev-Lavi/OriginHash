import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await fetch(`https://originhash.onrender.com/api/v1/users/verify/${token}`);
        const data = await res.text();

        if (res.ok) {
          setMessage("✅ Email verified successfully!");
          toast.success("Email verified successfully!");
          setTimeout(() => navigate("/"), 2000); // redirect to login
        } else {
          setMessage(`❌ Verification failed: ${data}`);
          toast.error(`Verification failed: ${data}`);
        }
      } catch (err) {
        setMessage("❌ Network error. Please try again later.");
        toast.error("Network error. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#6C4CFF]/50 to-[#edeef7]/60 p-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
        {loading ? (
          <p className="text-gray-600">Verifying your email...</p>
        ) : (
          <p className="text-sm text-gray-700">{message}</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default VerifyEmail;
