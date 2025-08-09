import React, { useState } from "react";
import axios from "axios";

export default function PaymentPage() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvCode, setCvCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const uniqueId = localStorage.getItem("uniqueId"); // get from Verify page

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!uniqueId) {
      alert("No uniqueId found. Please verify certificate first.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:4001/api/v1/cert/verify/payment", {
        uniqueId,
        cardNumber,
        expiryMonth,
        expiryYear,
        cvCode
      });

      setMessage(res.data.message);
    } catch (err) {
      console.error(err);
      setMessage("Payment failed");
    }
    setLoading(false);
  };

  return (
    <div style={{
      maxWidth: "400px",
      margin: "50px auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      background: "#fff",
      boxShadow: "0px 4px 8px rgba(0,0,0,0.1)"
    }}>
      <h3>Payment Details</h3>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Card Number</label>
          <input
            type="text"
            placeholder="Valid Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
          <div>
            <label>Expiry Month</label>
            <input
              type="text"
              placeholder="MM"
              value={expiryMonth}
              onChange={(e) => setExpiryMonth(e.target.value)}
              required
              style={{ width: "80px", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div>
            <label>Expiry Year</label>
            <input
              type="text"
              placeholder="YY"
              value={expiryYear}
              onChange={(e) => setExpiryYear(e.target.value)}
              required
              style={{ width: "80px", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div>
            <label>CV Code</label>
            <input
              type="text"
              placeholder="CV"
              value={cvCode}
              onChange={(e) => setCvCode(e.target.value)}
              required
              style={{ width: "80px", padding: "8px", marginTop: "5px" }}
            />
          </div>
        </div>

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          background: "#007bff",
          color: "#fff",
          padding: "10px",
          borderRadius: "4px",
          marginBottom: "15px"
        }}>
          <span>Final Payment</span>
          <span>$4200</span>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            background: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          {loading ? "Processing..." : "Pay"}
        </button>
      </form>

      {message && (
        <p style={{ marginTop: "15px", color: message.includes("success") ? "green" : "red" }}>
          {message}
        </p>
      )}
    </div>
  );
}
