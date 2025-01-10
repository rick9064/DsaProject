import React, { useState } from 'react';
import '../css/BinaryTree.css';

const BinaryTree = () => {
    const [values, setValues] = useState('');
    const [traversals, setTraversals] = useState(null);

    const handleInputChange = (e) => {
        setValues(e.target.value);
    };

    const handleSubmit = async () => {
        const inputValues = values.split(',').map((v) => v.trim());
        try {
            const response = await fetch('http://127.0.0.1:5000/create-tree', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ values: inputValues }),
            });
            const data = await response.json();
            setTraversals(data);
        } catch (error) {
            console.error('Error fetching traversals:', error);
        }
    };

    return (
        <div className="binary-tree">
            <h1>Binary Tree Traversals</h1>
            <input
                type="text"
                placeholder="Enter values (comma-separated)"
                value={values}
                onChange={handleInputChange}
            />
            <button onClick={handleSubmit}>Generate Traversals</button>

            {traversals && (
                <div className="results">
                    <h2>Traversals:</h2>
                    <p><strong>Inorder:</strong> {traversals.inorder.join(', ')}</p>
                    <p><strong>Preorder:</strong> {traversals.preorder.join(', ')}</p>
                    <p><strong>Postorder:</strong> {traversals.postorder.join(', ')}</p>
                </div>
            )}
        </div>
    );
};

export default BinaryTree;
