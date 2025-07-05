import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'blue' | 'purple' | 'green' | 'red' | 'yellow';
}

export default function Badge({ children, className = "", variant = 'blue' }: BadgeProps) {
  const variantClasses = {
    blue: 'border-blue-700 bg-blue-50 text-blue-800',
    purple: 'border-purple-700 bg-purple-50 text-purple-800',
    green: 'border-green-700 bg-green-50 text-green-800',
    red: 'border-red-700 bg-red-50 text-red-800',
    yellow: 'border-yellow-700 bg-yellow-50 text-yellow-800'
  };

  return (
    <span className={`inline-block px-3 py-0.5 rounded-full border text-xs font-bold tracking-wide focus:outline-none focus:ring-2 focus:ring-blue-700 transition ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
} 