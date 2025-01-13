import React from 'react';
import './css/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Search from './components/Search';
import Sort from './components/Sort';
import Queue from './components/Queue';
import Footer from './components/Footer';
import BinaryTree from './components/BinaryTree';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/sort" element={<Sort />} />
          <Route path="/queue" element={<Queue />} />
          <Route path="/binarytree" element={<BinaryTree/>}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 