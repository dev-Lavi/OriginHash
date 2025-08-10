import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./PaymentPage.css";

export default function PaymentPage() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvCode, setCvCode] = useState("");
  const [loading, setLoading] = useState(false);

  const uniqueId = localStorage.getItem("uniqueId"); // get from Verify page

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!uniqueId) {
      toast.error("No uniqueId found. Please verify certificate first.", {
        position: "bottom-right",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");

      const res = await axios.post(
        "http://localhost:4001/api/v1/cert/verify/payment",
        {
          uniqueId,
          cardNumber,
          expiryMonth,
          expiryYear,
          cvCode,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ Send as Bearer token
          },
        }
      );

      toast.success(res.data.message || "Payment successful!", {
        position: "bottom-right",
        autoClose: 3000,
        theme: "colored",
      });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Payment failed", {
        position: "bottom-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
    setLoading(false);
  };

  return (
    <div className="payment-wrapper">
      <div className="payment-card">
        <h2 className="payment-title">💳 Payment Details</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Card Number</label>
            <input
              type="text"
              placeholder="Valid Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </div>

          <div className="payment-row">
            <div className="input-group small">
              <label>Expiry Month</label>
              <input
                type="text"
                placeholder="MM"
                value={expiryMonth}
                onChange={(e) => setExpiryMonth(e.target.value)}
                required
              />
            </div>
            <div className="input-group small">
              <label>Expiry Year</label>
              <input
                type="text"
                placeholder="YY"
                value={expiryYear}
                onChange={(e) => setExpiryYear(e.target.value)}
                required
              />
            </div>
            <div className="input-group small">
              <label>CV Code</label>
              <input
                type="text"
                placeholder="CV"
                value={cvCode}
                onChange={(e) => setCvCode(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="price-box">
            <span>Final Payment</span>
            <span>$4200</span>
          </div>

          <button type="submit" disabled={loading} className="pay-btn">
            {loading ? "Processing..." : "Pay"}
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}
