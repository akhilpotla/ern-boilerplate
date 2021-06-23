const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const tokenAuth = require('../../middleware/auth');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route POST api/posts
// @desc Create a post
// @access Private
router.post('/', [
        tokenAuth, check('text', 'Text is required').not().isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            const user = await User.findById(req.user.id).select('-password');

            const newPost = new Post({
                text: req.body.text,
                name: user.name,
                user: req.user.id
            });

            const post = await newPost.save();

            return res.json(post);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server error');
        }
});

// @route GET api/posts
// @desc Get all posts
// @access Private
router.get('/', tokenAuth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});

// @route GET api/posts/:id
// @desc Get post by ID
// @access Private
router.get('/:id', tokenAuth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        res.json(post);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        return res.status(500).send('Server error');
    }
});

// @route DELETE api/posts/:id
// @desc Delete a post
// @access Private
router.delete('/:id', tokenAuth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await post.remove();
        res.json({ msg: 'Post was deleted' })
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        return res.status(500).send('Server error');
    }
});

// @route PUT api/posts/like/:id
// @desc Like a post
// @access Private
router.put('/like/:id', tokenAuth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check if post has already been liked by this user
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post already liked' });
        }

        post.likes.unshift({ user: req.user.id });

        await post.save()
        res.send(post.likes);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});

// @route PUT api/posts/unlike/:id
// @desc Unlike a post
// @access Private
router.put('/unlike/:id', tokenAuth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check if post has already been liked by this user
        if (post.likes.filter(like => like.user.toString() === req.user.id).length == 0) {
            return res.status(400).json({ msg: 'Post has not been liked' });
        }

        // Get remove index
        const removeIndex = post.likes
            .map(item => item.id)
            .indexOf(req.params.id);
        post.likes.splice(removeIndex, 1);

        await post.save()
        res.send(post.likes);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});

// @route POST api/posts/comment/:id
// @desc Comment on a post
// @access Private
router.post('/comment/:id', [
        tokenAuth, check('text', 'Text is required').not().isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            const user = await User.findById(req.user.id).select('-password');
            const post = await Post.findById(req.params.id);

            const newComment = {
                text: req.body.text,
                name: user.name,
                user: req.user.id
            };

            post.comments.unshift(newComment);
            await post.save();

            return res.json(post.comments);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server error');
        }
});

// @route DELETE api/posts/comment/:id/:comment_id
// @desc Delete comment
// @access Private
router.delete('/comment/:id/:comment_id', tokenAuth,  async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Pull out comment
        const comment = post.comments
            .find(comment => comment.id === req.params.comment_id);

        // Make sure comment exits
        if (!comment) {
            return res.status(404).json({ msg: 'Comment does not exit' });
        }

        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        // Get remove index
        const removeIndex = post.comments
            .map(comment => comment.id)
            .indexOf(req.params.comment_id);
        post.comments.splice(removeIndex, 1);

        await post.save()
        res.send(post.comments);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});


module.exports = router;
