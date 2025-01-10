import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

function Navbar() {
  return (
    <div className="navbar">
      <h1>DSA Algorithm Manager</h1>
      <nav>
        <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/search">Search</Link></li>
            <li><Link to="/sort">Sort</Link></li>
            <li><Link to="/queue">Queue</Link></li>
            <li><Link to="/binaryTree">Binary Tree</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
