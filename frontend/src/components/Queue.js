import React, { useState } from 'react';
import '../css/Queue.css';

function Queue() {
  const [operation, setOperation] = useState('enqueue');
  const [value, setValue] = useState('');
  const [queueData, setQueueData] = useState([]);
  const [showCode, setShowCode] = useState(false);

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

  const toggleCode = () => {
    setShowCode(!showCode);
  };

  return (
    <div className="queue">
      <h2>Queue Algorithm (Enqueue/Dequeue)</h2>
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

      <div className="algorithm-description">
        <p>
          The Queue data structure follows the FIFO (First In First Out) principle. 
          In an enqueue operation, an item is added to the end of the queue. In a dequeue operation, an item is removed from the front of the queue.
          The queue can be visualized as a line where new elements are added to the rear and removed from the front. 
          The time complexity for both enqueue and dequeue operations is O(1), making it very efficient for scenarios that require processing items in order.
        </p>
      </div>

      <button onClick={toggleCode} className="show-code-btn">
        Get Algorithm Code
      </button>

      {showCode && (
        <div className="python-code">
          <pre>
            {`
class Queue:
    def __init__(self):
        self.queue = []
    
    def enqueue(self, value):
        self.queue.append(value)
    
    def dequeue(self):
        if self.is_empty():
            return "Queue is empty"
        return self.queue.pop(0)
    
    def is_empty(self):
        return len(self.queue) == 0
    
    def get_queue(self):
        return self.queue

# Example usage:
queue = Queue()
queue.enqueue(10)
queue.enqueue(20)
queue.enqueue(30)
print(queue.get_queue())  # [10, 20, 30]
queue.dequeue()
print(queue.get_queue())  # [20, 30]
            `}
          </pre>
        </div>
      )}
    </div>
  );
}

export default Queue;
