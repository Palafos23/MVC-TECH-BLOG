const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model:User }]
        })
    const Posts = postData.map((post) => post.get ({ plain: true}));

    res.render('homepage', {Posts, logged_in: req.session.logged_in});
    }catch (err) {
        res.status(500).json(err);
    }
})