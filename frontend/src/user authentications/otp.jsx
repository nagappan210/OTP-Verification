import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Otp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const handleVerify = async () => {
    if (!email || !otp) return setMessage("Please enter both email and OTP.");

    try {
      const res = await axios.post("http://localhost:8000/verify-otp", { email, otp });
      setMessage(res.data.message);

      if (res.data.message === "OTP verified successfully") {
        localStorage.removeItem("email");
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Verification failed");
    }
  };

  const handleResendOtp = async () => {
    try {
      const res = await axios.post("http://localhost:8000/send-otp", { email });
      setMessage(res.data.message || "OTP resent successfully.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-white to-blue-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">🔐 Verify OTP</h2>

        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />

          <button
            onClick={handleVerify}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            ✅ Verify OTP
          </button>

          <button
            onClick={handleResendOtp}
            className="w-full bg-gray-200 text-blue-700 py-2 rounded-md hover:bg-gray-300"
          >
            🔁 Resend OTP
          </button>

          {message && <p className="text-center mt-2 text-sm text-gray-700">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Otp;
