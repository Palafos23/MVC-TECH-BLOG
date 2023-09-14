const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User, attributes: ['username']}]
        })
    const Posts = postData.map((post) => post.get ({ plain: true}));

    res.render('homepage', {Posts, logged_in: req.session.logged_in});
    }catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard/:username', async (req,res) => {
    try{
        const user = await User.findByPk(req.params.username, {
            include: [
                {
                    model: Post,
                    attributes: ['id'], where: {id:req.params.id}
                }
            ]
        })

        const userPosts = user.map((userPost) => userPost.get({ plain: true}));
        res.render('dashboard', { 
            userPosts, 
            logged_in: req.session.logged_in,
            username: req.session.username,
          });
    }catch (err) {
        res.status(500).json(err);
    }
})

router.get('/post/:id', async (req,res) => {
    try{
       const post = await Post.findByPk(req.params.id, {
        include: [{
            model: User, attributes: ['username'], where: {username: req.params.username},
        },
        {
            model: Comment, attributes: ['content'],
            include: [{ model: User, attributes: ["name"] }],
        },
      ],
    })
       const postData = post.get({ plain: true });
       res.render('post', { postData, 
        loggedIn: req.session.loggedIn, 
        username: req.session.username,
        user_id: req.session.user_id,
    });
    }catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req,res) => {
    try{
      res.render('login', {loggedIn: req.session.loggedIn,})
    }catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;
