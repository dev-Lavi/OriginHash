import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdVerified } from "react-icons/md"; // Replace with your desired SVG if needed
import "./VerifyCertificate.css"; // optional, or use inline styles

const VerifyCertificate = () => {
  const [certId, setCertId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleVerify = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:4001/api/v1/cert/verify",
        
        { uniqueId: certId },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            // Cookie will be sent automatically if withCredentials is set to true and token is stored
          },
        }
      );

      const { success, cert, message } = response.data;

      if (success && cert) {
        // Navigate to payment page, optionally pass cert info
        navigate("/payment", { state: { cert } });
      } else {
        setError("Invalid certificate or verification failed.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-wrapper">
      <div className="verify-card">
        <div className="icon-center">
          <MdVerified size={48} color="#5E5ADB" />
        </div>
        <h2>Verify Certificate</h2>
        <p style={{ marginBottom: "1rem", color: "#555" }}>Enter your certificate ID to verify</p>

        <input
          type="text"
          placeholder="Enter certificate ID"
          value={certId}
          onChange={(e) => setCertId(e.target.value)}
          className="verify-input"
        />

        {error && <div className="error-text">{error}</div>}

        <button
          className="verify-button"
          onClick={handleVerify}
          disabled={loading || !certId.trim()}
        >
          {loading ? "Verifying..." : "Pay to Verify"}
        </button>
      </div>
    </div>
  );
};

export default VerifyCertificate;
