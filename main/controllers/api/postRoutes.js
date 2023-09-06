const router = require('express').Router();
const { Post } = require ('../../models');

//New post route
router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create(req.body);
        res.status(200).json(newPost);
    }catch (err) {
        res.status(500).json(err);
    }
})

//update comment route 
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.update(req.body, {
        where: {
          id: req.params.id,
    }
});
      res.status(200).json(post);
    }catch (err) {
      res.status(500).json(err);
    }
});

//delete comment route
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.destroy({
          where: {
            id: req.params.id
          }
        });
        if(!post) {
          res.status(404).json({ message: 'No tag found with inputed id'});
          return;
        }
        res.status(200).json(post);
      } catch (err) {
        res.status(500).json(err);
      }
});



module.exports = router;