// frontend/src/pages/CreatePost.js

import React, { useState } from 'react';
import { createPost } from '../api';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createPost({ title, content });
        navigate('/');
    };

    return (
        <div>
            <h2>Create New Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Content</label>
                    <textarea
                        className="form-control"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Create</button>
            </form>
        </div>
    );
};

export default CreatePost;

