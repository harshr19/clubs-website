import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function Confirmation() {
  const location = useLocation();
  const [message, setMessage] = useState("Your request has been processed successfully.");
  const [email, setEmail] = useState("");
  
  useEffect(() => {
    // Get the message and email from location state if available
    if (location.state) {
      if (location.state.message) {
        setMessage(location.state.message);
      }
      if (location.state.email) {
        setEmail(location.state.email);
      }
    }
  }, [location]);

  // Resend verification email functionality
  const handleResendVerification = async () => {
    if (!email) return;
    
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email
      });
      
      if (error) {
        throw error;
      }
      
      alert("Verification email has been resent. Please check your inbox.");
    } catch (err: any) {
      alert(`Error resending email: ${err.message}`);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg text-center">
        <svg
          className="w-16 h-16 mx-auto text-blue-500 mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        
        <h2 className="text-2xl font-bold mb-2">Check Your Email</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        
        {email && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700">
              A verification link has been sent to: <strong>{email}</strong>
            </p>
            <button 
              onClick={handleResendVerification}
              className="text-sm text-blue-600 hover:text-blue-800 mt-2 underline"
            >
              Didn't receive the email? Click here to resend
            </button>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/login"
            className="inline-block bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Go to Login
          </Link>
          <Link
            to="/"
            className="inline-block bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition"
          >
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}