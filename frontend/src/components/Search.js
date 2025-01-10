import React, { useState } from 'react';
import '../css/Search.css';

function Search() {
  const [array, setArray] = useState('');
  const [target, setTarget] = useState('');
  const [result, setResult] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch('http://localhost:5000/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          array: array.split(',').map((item) => parseFloat(item.trim())),
          target: parseFloat(target),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to connect to the server.');
      }

      const data = await response.json();
      if (data.error) {
        setResult(data.error);
      } else if (data.found_at === -1) {
        setResult('Target not found in the array.');
      } else {
        setResult(`Target found at index: ${data.found_at}`);
      }
    } catch (error) {
      setResult('An error occurred while searching.');
      console.error(error);
    }
  };

  return (
    <div className="search">
      <h2>Search Algorithm (Linear Search)</h2>
      <input
        type="text"
        value={array}
        onChange={(e) => setArray(e.target.value)}
        placeholder="Enter array (comma-separated)"
      />
      <input
        type="number"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        placeholder="Enter target number"
      />
      <button onClick={handleSearch}>Search</button>
      <div className="result">{result}</div>
    </div>
  );
}

export default Search;
