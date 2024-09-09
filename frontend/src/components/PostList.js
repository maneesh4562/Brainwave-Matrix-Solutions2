// frontend/src/components/PostList.js

import React from 'react';
import { Link } from 'react-router-dom';

const PostList = ({ posts }) => (
    <ul className="list-group">
        {posts.map(post => (
            <li className="list-group-item" key={post._id}>
                <h5><Link to={`/posts/${post._id}`}>{post.title}</Link></h5>
                <p>{post.content.substring(0, 100)}...</p>
                <small>By {post.author.username}</small>
            </li>
        ))}
    </ul>
);

export default PostList;
