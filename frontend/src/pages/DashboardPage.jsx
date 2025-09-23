// src/pages/DashboardPage.jsx
import React, { useState } from 'react';
import SummaryStats from '../components/SummaryStats';
import IssuesTable from '../components/IssuesTable';
import WebsiteInput from '../components/WebsiteInput';

const DashboardPage = () => {

  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const handleRunChecks = async () => {
    setIsLoading(true);
  
    setTimeout(() => {
      const dummyResults = {
        stats: { total: 100, problems: 4, health: '96%' },
        issues: [
          { url: 'http://baddomain.com', error: 'SSL_ERROR', severity: 'High' },
          { url: 'http://redirected.com', error: 'REDIRECT', severity: 'Medium' },
          { url: 'http://malware-site.net', error: 'ANOMALY_CONTENT_DETECTED', severity: 'High' },
          { url: 'http://db-error.org', error: 'DB_ERROR', severity: 'High' },
        ],
      };
      setResults(dummyResults);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto p-4">
      {/* 1. The input and action section */}
      <WebsiteInput onRunChecks={handleRunChecks} isLoading={isLoading} />

      {/* 2. The results section (only shows after a check) */}
      {isLoading && <p>Scanning websites, please wait...</p>}
      
      {results && (
        <div className="mt-8">
          <SummaryStats stats={results.stats} />
          <IssuesTable issues={results.issues} />
        </div>
      )}
    </div>
  );
};

export default DashboardPage;