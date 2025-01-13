import React, { useState } from 'react';
import '../css/BinaryTree.css';

const BinaryTree = () => {
    const [values, setValues] = useState('');
    const [traversals, setTraversals] = useState(null);
    const [showCode, setShowCode] = useState(false);

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

    const toggleCode = () => {
        setShowCode(!showCode);
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

            <div className="algorithm-description">
                <p>
                    Binary Tree traversal refers to the process of visiting all the nodes in a binary tree, in a specific order. 
                    There are three main types of binary tree traversal:
                    <ul>
                        <li><strong>Inorder Traversal:</strong> Left subtree → Root → Right subtree</li>
                        <li><strong>Preorder Traversal:</strong> Root → Left subtree → Right subtree</li>
                        <li><strong>Postorder Traversal:</strong> Left subtree → Right subtree → Root</li>
                    </ul>
                </p>
            </div>

            <button onClick={toggleCode} className="show-code-btn">
                Get Algorithm Code
            </button>

            {showCode && (
                <div className="python-code">
                    <pre>
                        {`
# Inorder Traversal
def inorder(root):
    if root:
        inorder(root.left)
        print(root.value, end=' ')
        inorder(root.right)

# Preorder Traversal
def preorder(root):
    if root:
        print(root.value, end=' ')
        preorder(root.left)
        preorder(root.right)

# Postorder Traversal
def postorder(root):
    if root:
        postorder(root.left)
        postorder(root.right)
        print(root.value, end=' ')
                        `}
                    </pre>
                </div>
            )}
        </div>
    );
};

export default BinaryTree;
