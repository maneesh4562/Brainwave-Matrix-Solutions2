// frontend/src/pages/PostDetail.js

import React, { useState, useEffect } from 'react';
import { getPosts, deletePost } from '../api';
import { useParams, useNavigate } from 'react-router-dom';

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            const result = await getPosts(id);
            setPost(result.data);
        };
        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        await deletePost(id);
        navigate('/');
    };

    return (
        <div>
            {post ? (
                <>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <small>By {post.author.username}</small>
                    <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                    <button className="btn btn-secondary" onClick={() => navigate(`/posts/edit/${post._id}`)}>Edit</button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default PostDetail;
