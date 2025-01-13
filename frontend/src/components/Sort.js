import React, { useState } from 'react';
import '../css/Sort.css';

function Sort() {
  const [array, setArray] = useState('');
  const [sortedArray, setSortedArray] = useState([]);
  const [showCode, setShowCode] = useState(false);

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

  const toggleCode = () => {
    setShowCode(!showCode);
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

      <div className="algorithm-description">
        <p>
          The Bubble Sort algorithm works by repeatedly stepping through the list, comparing adjacent items, and swapping them if they are in the wrong order.
          This process continues until the list is sorted. The algorithm is called "Bubble Sort" because the largest unsorted element "bubbles" up to its correct position
          after each pass through the list. The time complexity of Bubble Sort is O(n^2), where n is the number of elements in the array.
        </p>
      </div>

      <button onClick={toggleCode} className="show-code-btn">
        Get Algorithm Code
      </button>

      {showCode && (
        <div className="python-code">
          <pre>
            {`
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr
            `}
          </pre>
        </div>
      )}
    </div>
  );
}

export default Sort;
