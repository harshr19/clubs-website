"use client";
import Card from "../../components/Card";
import { motion } from "framer-motion";

export default function ConfirmationPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="p-8 flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-4xl">✅</span>
          </div>
          <h2 className="text-2xl font-bold text-center">Registration Successful!</h2>
          <p className="text-gray-500 text-center">You have successfully registered.<br/>Check your dashboard for more details.</p>
          <a href="/" className="px-6 py-2 rounded-full bg-gray-900 text-white font-semibold shadow hover:bg-gray-800 transition">Go to Home</a>
        </Card>
      </motion.div>
    </main>
  );
} 