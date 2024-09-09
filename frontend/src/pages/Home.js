// frontend/src/pages/Home.js

import React, { useState, useEffect } from 'react';
import { getPosts } from '../api';
import PostList from '../components/PostList';

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const result = await getPosts();
            setPosts(result.data);
        };
        fetchPosts();
    }, []);

    return (
        <div>
            <h1>Blog Posts</h1>
            <PostList posts={posts} />
        </div>
    );
};

export default Home;
