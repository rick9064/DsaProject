import React, { useState } from 'react';
import '../css/Queue.css';

function Queue() {
  const [operation, setOperation] = useState('enqueue');
  const [value, setValue] = useState('');
  const [queueData, setQueueData] = useState([]);

  const handleQueue = async () => {
    const requestBody = {
      operation,
      value: operation === 'enqueue' ? value : null,
    };

    try {
      const response = await fetch('http://localhost:5000/queue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (data.current_queue) {
        setQueueData(data.current_queue); 
      } else {
        setQueueData([]); 
      }
    } catch (error) {
      console.error('Error processing queue operation:', error);
    }
  };

  return (
    <div className="queue">
      <h2>Queue Algorithm</h2>
      <select onChange={(e) => setOperation(e.target.value)} value={operation}>
        <option value="enqueue">Enqueue</option>
        <option value="dequeue">Dequeue</option>
      </select>
      {operation === 'enqueue' && (
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value to enqueue"
        />
      )}
      <button onClick={handleQueue}>Execute</button>
      <div className="result">
        Current Queue: {queueData.length > 0 ? JSON.stringify(queueData) : 'Queue is empty'}
      </div>
    </div>
  );
}

export default Queue;
