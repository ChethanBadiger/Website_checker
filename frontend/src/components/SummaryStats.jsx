// src/components/SummaryStats.jsx
import React from 'react';


const StatCard = ({ title, value, bgColor }) => (
  <div className={`p-4 rounded-lg shadow-md ${bgColor}`}>
    <h3 className="text-sm font-medium text-gray-200">{title}</h3>
    <p className="text-3xl font-bold text-white">{value}</p>
  </div>
);

const SummaryStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <StatCard title="Health Score" value={stats.health} bgColor="bg-blue-500" />
      <StatCard title="Sites Checked" value={stats.total} bgColor="bg-gray-700" />
      <StatCard title="Problems Found" value={stats.problems} bgColor="bg-red-500" />
    </div>
  );
};

export default SummaryStats;