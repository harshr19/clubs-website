import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../mocks/auth";
import { useAuth } from "../contexts/AuthContext";

export default function Signup() {
  // Form state management
  const [userRole, setUserRole] = useState<"student" | "admin">("student");
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const [confirmPasswordField, setConfirmPasswordField] = useState("");
  const [emailValidationError, setEmailValidationError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [formError, setFormError] = useState("");
  
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  // Validate email domain for MITS students
  const validateEmailDomain = (email: string) => {
    const requiredDomain = "@mitsgwl.ac.in";
    if (!email.endsWith(requiredDomain)) {
      setEmailValidationError(`Only ${requiredDomain} email addresses are allowed`);
      return false;
    }
    setEmailValidationError("");
    return true;
  };

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmailAddress(newEmail);
    
    // Real-time validation
    if (newEmail && !newEmail.endsWith("@mitsgwl.ac.in")) {
      setEmailValidationError("Only @mitsgwl.ac.in email addresses are allowed");
    } else {
      setEmailValidationError("");
    }
  };

  const handleFormSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    
    // Validate email domain
    if (!validateEmailDomain(emailAddress)) {
      return;
    }

    // Check password match
    if (passwordField !== confirmPasswordField) {
      setFormError("Passwords don't match. Please try again.");
      return;
    }

    setIsProcessing(true);

    try {
      const newUser = await signup(fullName, emailAddress, passwordField, userRole);
      authLogin(newUser);
      
      // Redirect user based on their role
      if (newUser.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setFormError("Registration failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRoleSelection = (role: "student" | "admin") => {
    setUserRole(role);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center">Join Campus Connect</h2>
        
        {formError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {formError}
          </div>
        )}
        
        {/* User type selection */}
        <div className="flex justify-center gap-4 mb-2">
          <button
            type="button"
            className={`px-4 py-2 rounded-lg font-semibold transition border ${
              userRole === "student" 
                ? "bg-blue-600 text-white" 
                : "bg-gray-100 text-blue-700"
            }`}
            onClick={() => handleRoleSelection("student")}
          >
            Student
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-lg font-semibold transition border ${
              userRole === "admin" 
                ? "bg-blue-600 text-white" 
                : "bg-gray-100 text-blue-700"
            }`}
            onClick={() => handleRoleSelection("admin")}
          >
            Club Admin
          </button>
        </div>

        {/* Registration form */}
        <form className="flex flex-col gap-4" onSubmit={handleFormSubmission}>
          <input
            type="text"
            placeholder="Full Name"
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <div>
            <input
              type="email"
              placeholder="Email (@mitsgwl.ac.in)"
              className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-200 w-full ${
                emailValidationError ? 'border-red-500' : 'border-gray-200'
              }`}
              value={emailAddress}
              onChange={handleEmailInputChange}
              required
            />
            {emailValidationError && (
              <p className="text-red-500 text-sm mt-1">{emailValidationError}</p>
            )}
          </div>
          <input
            type="password"
            placeholder="Create a password"
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={passwordField}
            onChange={(e) => setPasswordField(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm your password"
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={confirmPasswordField}
            onChange={(e) => setConfirmPasswordField(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? "Creating account..." : `Sign up as ${userRole === "student" ? "Student" : "Club Admin"}`}
          </button>
        </form>

        {/* Login link */}
        <div className="text-center text-sm text-gray-500">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Sign in</Link>
        </div>
      </div>
    </main>
  );
} 