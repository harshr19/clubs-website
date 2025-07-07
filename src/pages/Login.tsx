import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../mocks/auth";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  // Form state
  const [selectedRole, setSelectedRole] = useState<"student" | "admin">("student");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");
  
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsSubmitting(true);

    try {
      const userData = await login(emailInput, passwordInput);
      if (userData) {
        authLogin(userData);
        // Navigate based on user type
        if (userData.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        setLoginError("Invalid credentials. Please check your email and password.");
      }
    } catch (err) {
      console.error('Login error:', err);
      setLoginError("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRoleChange = (newRole: "student" | "admin") => {
    setSelectedRole(newRole);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
        
        {loginError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {loginError}
          </div>
        )}
        
        {/* Role selector */}
        <div className="flex justify-center gap-4 mb-2">
          <button
            type="button"
            className={`px-4 py-2 rounded-lg font-semibold transition border ${
              selectedRole === "student" 
                ? "bg-blue-600 text-white" 
                : "bg-gray-100 text-blue-700"
            }`}
            onClick={() => handleRoleChange("student")}
          >
            Student
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-lg font-semibold transition border ${
              selectedRole === "admin" 
                ? "bg-blue-600 text-white" 
                : "bg-gray-100 text-blue-700"
            }`}
            onClick={() => handleRoleChange("admin")}
          >
            Club Admin
          </button>
        </div>
        
        <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Signing in..." : `Sign in as ${selectedRole === "student" ? "Student" : "Club Admin"}`}
          </button>
        </form>
        
        <div className="text-center text-sm text-gray-500">
          New here? <Link to="/signup" className="text-blue-600 hover:underline">Create an account</Link>
        </div>
        
        {/* Demo accounts for testing */}
        <div className="text-center text-xs text-gray-400 mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="mb-2 font-medium">Demo Accounts:</p>
          <p>Student: harsh@student.com</p>
          <p>Club Admin: krish@club.com</p>
          <p>Admin: arpit @admin.com</p>
          <p className="mt-2 text-gray-500">(Any password works for demo)</p>
        </div>
      </div>
    </main>
  );
} 