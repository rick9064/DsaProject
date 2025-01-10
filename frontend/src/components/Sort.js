import React, { useState } from 'react';
import '../css/Sort.css';

function Sort() {
  const [array, setArray] = useState('');
  const [sortedArray, setSortedArray] = useState([]);

  const handleSort = async () => {
    try {
      const response = await fetch('http://localhost:5000/sort', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ array: array.split(',').map(Number) }),
      });

      const data = await response.json();

      if (data.sorted_array && Array.isArray(data.sorted_array)) {
        setSortedArray(data.sorted_array);
      } else {
        setSortedArray([]);
      }
    } catch (error) {
      console.error('Error sorting array:', error);
      setSortedArray([]);
    }
  };

  return (
    <div className="sort">
      <h2>Sorting Algorithm (Bubble Sort)</h2>
      <input
        type="text"
        value={array}
        onChange={(e) => setArray(e.target.value)}
        placeholder="Enter array (comma separated)"
      />
      <button onClick={handleSort}>Sort</button>
      <div className="result">
        After Sorting: {sortedArray.length > 0 ? `[ ${sortedArray.join(', ')} ]` : '[ ]'}
      </div>
    </div>
  );
}

export default Sort;
