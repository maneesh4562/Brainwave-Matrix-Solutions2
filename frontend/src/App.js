// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import PostDetail from './pages/PostDetail';

const App = () => {
    return (
        <Router>
            <div>
                <Navbar />
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/posts/create" element={<CreatePost />} />
                        <Route path="/posts/edit/:id" element={<EditPost />} />
                        <Route path="/posts/:id" element={<PostDetail />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );};

export default App;
