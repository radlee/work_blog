const router = require('express').Router();
const Blog = require('../models/blogsModel');
const authMiddleware = require('../middlewares/authMiddleware');

//Add new blog
router.post('/add-blog', authMiddleware, async (req, res) => {
    try {
        const newBlog = new Blog(req.body);
        await newBlog.save();
        res.send({
            message: 'Blog added with success',
            data: newBlog,
            success: true
        });
    } catch (error) {
        res.send({
            error: error.message,
            success: false
        });
    }
});

//Get all blogs
router.post('/get-all-blogs', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.send({
            message: 'Blogs fetched with success',
            data: blogs,
            success: true
        });
    } catch (error) {
        res.send({
            error: error.message,
            success: false
        });
    }
});

//Get blog by id
router.post('/get-blog-by-id/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.send({
            message: 'Blog fetched with success',
            data: blog,
            success: true
        });
    } catch (error) {
        res.send({
            error: error.message,
            success: false
        });
    }
});

module.exports = router;