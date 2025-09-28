// src/pages/DashboardPage.jsx
import React, { useState } from "react";
import {
  FiPlus,
  FiTrash,
  FiBarChart2,
  FiAlertTriangle,
  FiCheckCircle,
  FiZap,
  FiLoader,
  FiGlobe,
} from "react-icons/fi";
import { CirclePlay, Folder } from "lucide-react";
import "./Dashboard.css";

const DashboardPage = () => {
  const [websites, setWebsites] = useState(["https://google.com"]);
  const [newWebsite, setNewWebsite] = useState("");
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  const handleAddWebsite = (e) => {
    e.preventDefault();
    if (newWebsite && !websites.includes(newWebsite)) {
      setWebsites([...websites, newWebsite]);
      setNewWebsite("");
    }
  };

  const handleRemoveWebsite = (siteToRemove) => {
    setWebsites(websites.filter((site) => site !== siteToRemove));
  };
  // for all websites check
  const handleRunChecks = async () => {
    setIsLoading(true);

    setTimeout(() => {
      const dummyResults = {
        stats: { total: websites.length, problems: 2, health: "98%" },
        issues: [
          { url: "https://google.com", error: "OK", severity: "None" },
          { url: "http://baddomain.com", error: "SSL_ERROR", severity: "High" },
          {
            url: "http://redirected.com",
            error: "REDIRECT",
            severity: "Medium",
          },
        ],
      };
      setResults(dummyResults);
      setIsLoading(false);
    }, 2000);
  };
  //for single website check
  const handleRunCheck = async () => {
    setIsLoad(true);

    setTimeout(() => {
      const dummyResults = {
        stats: { total: websites.length, problems: 2, health: "98%" },
        issues: [
          { url: "https://google.com", error: "OK", severity: "None" },
          { url: "http://baddomain.com", error: "SSL_ERROR", severity: "High" },
          {
            url: "http://redirected.com",
            error: "REDIRECT",
            severity: "Medium",
          },
        ],
      };
      setResults(dummyResults);
      setIsLoad(false);
    }, 2000);
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <FiZap className="logo-icon" />
          <h1>Website Checker</h1>
        </div>
        <nav>
          <ul>
            <li className="active">
              <FiBarChart2 /> Dashboard
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="page-header">
          <h2>Dashboard</h2>
          <button
            onClick={handleRunChecks}
            className="run-checks-btn"
            disabled={isLoading}>
            {isLoading ? (
              <>
                <FiLoader className="spin" /> Scanning...
              </>
            ) : (
              "Run All Checks"
            )}
          </button>
        </header>

        <div className="content-grid">
          {/* Websites Card */}
          <div className="card website-list-card">
            <h3>
              <FiGlobe /> Monitored Websites ({websites.length})
            </h3>
            <form onSubmit={handleAddWebsite} className="add-website-form">
              <FiPlus style={{ paddingTop: "10px" }} />

              <div class="file-upload-container">
                <input
                  type="text"
                  className="enterLink"
                  value={newWebsite}
                  onChange={(e) => setNewWebsite(e.target.value)}
                  placeholder="Add a new website"
                />
                <input
                  type="file"
                  id="fileSelect"
                  class="fileSelect"
                  accept=".csv"
                  aria-label="Upload CSV file"
                />
                <label for="fileSelect" class="file-input-label">
                  <Folder style={{ paddingRight: "10px", height: "20px" }} />
                  Upload .csv
                </label>
              </div>
            </form>
            <ul>
              {websites.map((site) => (
                <li key={site} className="website-item">
                  <span>{site}</span>
                  <div >
                    <button
                      onClick={() => handleRemoveWebsite(site)}
                      className="delete-btn" style={{height:"3rem"}}>
                      <FiTrash style={{height:"1.5rem",fontSize:"1rem"}}/>
                    </button>

                    <button
                      onClick={handleRunCheck}
                      className="run-check-btn"
                      disabled={isLoad} style={{height:"2rem", backgroundColor:"transparent",border:"transparent"}} >
                      {isLoad ? (
                        <FiLoader className="spin"  style={{display:"flex",height:"24px",width:"24px", gap:".5rem"}}/>
                      ) : (
                        <CirclePlay color="white" />
                      )}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Summary Card */}
          <div className="card summary-card">
            <h3>
              <FiBarChart2 /> Summary
            </h3>
            {results ? (
              <div className="stats-grid">
                <div className="stat-item">
                  <FiCheckCircle className="stat-icon success" />
                  <h4>Health Score</h4>
                  <p>{results.stats.health}</p>
                </div>
                <div className="stat-item">
                  <FiBarChart2 className="stat-icon" />
                  <h4>Sites Checked</h4>
                  <p>{results.stats.total}</p>
                </div>
                <div className="stat-item">
                  <FiAlertTriangle
                    className="stat-icon danger"
                    color="#d7191c"
                  />
                  <h4>Problems Found</h4>
                  <p>{results.stats.problems}</p>
                </div>
              </div>
            ) : (
              <p>Run a check to see the summary.</p>
            )}
          </div>

          {/* Issues Card */}
          <div className="card issues-card">
            <h3>
              <FiAlertTriangle /> Detected Issues
            </h3>
            {isLoading && <p>Loading issues...</p>}
            {results ? (
              <ul className="issues-list">
                {results.issues.map((issue, index) => (
                  <li
                    key={index}
                    className={`issue-item severity-${issue.severity.toLowerCase()}`}>
                    <div className="issue-info">
                      <span className="issue-url">{issue.url}</span>
                      <span className="issue-error">{issue.error}</span>
                    </div>
                    <span className="issue-severity">{issue.severity}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No issues detected yet.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
