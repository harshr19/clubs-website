import React from "react";

interface Tab {
  label: string;
  value: string;
}

export default function Tabs({
  tabs,
  value,
  onChange,
  className = "",
}: {
  tabs: Tab[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <div className={`flex gap-2 ${className}`}>
      {tabs.map(tab => (
        <button
          key={tab.value}
          className={`px-4 py-1 rounded-lg font-semibold transition-colors duration-200 ${value === tab.value ? "bg-blue-600 text-white shadow" : "bg-gray-100 text-blue-700 hover:bg-blue-100"}`}
          onClick={() => onChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
} 