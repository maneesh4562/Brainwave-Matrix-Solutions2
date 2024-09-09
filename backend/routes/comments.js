// backend/routes/comments.js

const express = require('express');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Add a Comment
router.post('/:postId', verifyToken, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).json({ msg: 'Post not found' });

        const newComment = new Comment({
            text: req.body.text,
            author: req.user.id,
            postId: req.params.postId,
        });

        const comment = await newComment.save();
        post.comments.push(comment._id);
        await post.save();

        res.json(comment);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get Comments for a Post
router.get('/:postId', async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId }).populate('author', 'username');
        res.json(comments);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
