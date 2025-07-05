import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [role, setRole] = useState<"student" | "admin">("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email: string) => {
    const mitsDomain = "@mitsgwl.ac.in";
    if (!email.endsWith(mitsDomain)) {
      setEmailError(`Only ${mitsDomain} email addresses are allowed`);
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (newEmail && !newEmail.endsWith("@mitsgwl.ac.in")) {
      setEmailError("Only @mitsgwl.ac.in email addresses are allowed");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Add signup logic here
    console.log("Signup attempt:", { role, name, email, password });
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        {/* <p className="text-center text-sm text-gray-600 mb-4">
          Only MITS Gwalior students with @mitsgwl.ac.in email addresses can register
        </p> */}
        
        {/* Role Selection */}
        <div className="flex justify-center gap-4 mb-2">
          <button
            type="button"
            className={`px-4 py-2 rounded-lg font-semibold transition border ${role === "student" ? "bg-blue-600 text-white" : "bg-gray-100 text-blue-700"}`}
            onClick={() => setRole("student")}
          >
            Student
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-lg font-semibold transition border ${role === "admin" ? "bg-blue-600 text-white" : "bg-gray-100 text-blue-700"}`}
            onClick={() => setRole("admin")}
          >
            Club Admin
          </button>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <div>
            <input
              type="email"
              placeholder="Email " //(@mitsgwl.ac.in)"
              className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-200 w-full ${
                emailError ? 'border-red-500' : 'border-gray-200'
              }`}
              value={email}
              onChange={handleEmailChange}
              required
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition mt-2"
          >
            Sign up as {role === "student" ? "Student" : "Club Admin"}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center text-sm text-gray-500">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </div>
      </div>
    </main>
  );
} 