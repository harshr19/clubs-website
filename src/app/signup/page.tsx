"use client";
import { useState } from "react";

export default function SignupPage() {
  const [role, setRole] = useState<"student" | "admin">("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <div className="flex justify-center gap-4 mb-2">
          <button
            className={`px-4 py-2 rounded-lg font-semibold transition border ${role === "student" ? "bg-blue-600 text-white" : "bg-gray-100 text-blue-700"}`}
            onClick={() => setRole("student")}
          >
            Student
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-semibold transition border ${role === "admin" ? "bg-blue-600 text-white" : "bg-gray-100 text-blue-700"}`}
            onClick={() => setRole("admin")}
          >
            Club Admin
          </button>
        </div>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition mt-2"
            onClick={e => { e.preventDefault(); /* dummy signup */ }}
          >
            Sign Up as {role === "student" ? "Student" : "Club Admin"}
          </button>
        </form>
        <div className="text-center text-sm text-gray-500">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </div>
      </div>
    </main>
  );
} 