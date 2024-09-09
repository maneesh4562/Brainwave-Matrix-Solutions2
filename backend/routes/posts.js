// backend/routes/posts.js

const express = require('express');
const Post = require('../models/Post');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all posts
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().populate('author', ['username']);
        res.json(posts);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Create a post
router.post('/', auth, async (req, res) => {
    const { title, content } = req.body;

    try {
        const newPost = new Post({
            title,
            content,
            author: req.user.id
        });

        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Update a post
router.put('/:id', auth, async (req, res) => {
    const { title, content } = req.body;

    try {
        let post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ msg: 'Post not found' });

        // Check user
        if (post.author.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        post = await Post.findByIdAndUpdate(
            req.params.id,
            { $set: { title, content } },
            { new: true }
        );

        res.json(post);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Delete a post
router.delete('/:id', auth, async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ msg: 'Post not found' });

        // Check user
        if (post.author.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await Post.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Post removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
