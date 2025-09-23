// src/components/WebsiteInput.jsx
import React, { useState } from 'react';

const WebsiteInput = ({ onAddWebsite }) => {

  const [url, setUrl] = useState('');

  const handleSubmit = (event) => {
 
    event.preventDefault();
    

    if (!url.trim()) {
      alert('Please enter a URL.');
      return;
    }

    onAddWebsite(url);

 
    setUrl('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors"
        >
          Add Website
        </button>
      </form>
    </div>
  );
};

export default WebsiteInput;