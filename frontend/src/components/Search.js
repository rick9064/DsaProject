import React, { useState } from 'react';
import '../css/Search.css';

function Search() {
  const [array, setArray] = useState('');
  const [target, setTarget] = useState('');
  const [result, setResult] = useState('');
  const [showCode, setShowCode] = useState(false);

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

  const toggleCode = () => {
    setShowCode(!showCode);
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

      <div className="algorithm-description">
        <p>
          The Linear Search algorithm works by checking each element in the array, one at a time, starting from the first element.
          If the element matches the target, the algorithm returns the index of that element. If the element is not found,
          it continues checking until the end of the array. The worst-case time complexity of this algorithm is O(n), where
          n is the number of elements in the array, as each element needs to be checked.
        </p>
      </div>

      <button onClick={toggleCode} className="show-code-btn">
        Get Algorithm Code
      </button>

      {showCode && (
        <div className="python-code">
          <pre>
            {`
def linear_search(arr, target):
    for index, value in enumerate(arr):
        if value == target:
            return index
    return -1
            `}
          </pre>
        </div>
      )}
    </div>
  );
}

export default Search;
