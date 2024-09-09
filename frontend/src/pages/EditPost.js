// frontend/src/pages/EditPost.js

import React, { useState, useEffect } from 'react';
import { updatePost, getPosts } from '../api';
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            const result = await getPosts(id);
            setTitle(result.data.title);
            setContent(result.data.content);
        };
        fetchPost();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updatePost(id, { title, content });
        navigate('/');
    };

    return (
        <div>
            <h2>Edit Post</h2>
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
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
};

export default EditPost;
