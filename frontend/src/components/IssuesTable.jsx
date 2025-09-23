// src/components/IssuesTable.jsx
import React from 'react';

const getSeverityClass = (severity) => {
  switch (severity) {
    case 'High': return 'bg-red-500 text-white';
    case 'Medium': return 'bg-yellow-500 text-black';
    default: return 'bg-gray-200 text-black';
  }
};

const IssuesTable = ({ issues }) => {
  if (!issues || issues.length === 0) {
    return <p>No issues found. Everything looks good!</p>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-bold text-lg mb-4">Detected Issues</h3>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="p-2">Website URL</th>
            <th className="p-2">Error Type</th>
            <th className="p-2">Severity</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="p-2 font-mono">{issue.url}</td>
              <td className="p-2">{issue.error}</td>
              <td className="p-2">
                <span className={`px-2 py-1 text-xs font-bold rounded-full ${getSeverityClass(issue.severity)}`}>
                  {issue.severity}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssuesTable;