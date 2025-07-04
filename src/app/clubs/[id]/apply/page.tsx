"use client";
import { useState } from "react";

export default function ApplyForPosition() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    branch: "",
    year: "",
    interest: "",
    resume: ""
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="max-w-lg mx-auto p-6 mt-10 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Apply for an Open Position</h1>
      {submitted ? (
        <div className="text-green-600 text-center font-semibold py-8">
          Thank you for applying! We have received your application.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input name="name" value={form.name} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block font-semibold mb-1">Branch</label>
              <select name="branch" value={form.branch} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2">
                <option value="">Select Branch</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="ETE">ETE</option>
                <option value="CSD">CSD</option>
                <option value="AI">AI</option>
                <option value="AIML">AIML</option>
                <option value="AIDS">AIDS</option>
                <option value="IT-IOT">IT-IOT</option>
                <option value="EE-IOT">EE-IOT</option>
                <option value="CIVIL">CIVIL</option>
                <option value="MECHANICAL">MECHANICAL</option>
                <option value="CHEM">CHEM</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block font-semibold mb-1">Year</label>
              <select name="year" value={form.year} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2">
                <option value="">Select Year</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-1">Why are you interested?</label>
            <textarea name="interest" value={form.interest} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2" rows={3} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Resume (URL)</label>
            <input name="resume" value={form.resume} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2" placeholder="https://..." />
          </div>
          <button type="submit" className="w-full bg-blue-700 text-white font-bold py-2 rounded hover:bg-blue-900 transition">Submit Application</button>
        </form>
      )}
    </main>
  );
} 