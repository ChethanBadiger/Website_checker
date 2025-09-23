
import React from 'react';
import { useParams } from 'react-router-dom';

const LogDetailPage = () => {
  const { run_id } = useParams();

  return (
    <div>
      <h2>Log Details</h2>
      <p>Showing results for Run ID: {run_id}</p>

    </div>
  );
};

export default LogDetailPage;