const router = require('express').Router();
const { Comment } = require ('../../models');

//New comment route
router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create(req.body);
        res.status(200).json(newComment);
    }catch (err) {
        res.status(500).json(err);
    }
});

//update comment route 
router.put('/:id', async (req, res) => {
    try {
        const comment = await Comment.update(req.body, {
        where: {
          id: req.params.id,
    }
});
      res.status(200).json(comment);
    }catch (err) {
      res.status(500).json(err);
    }
});

//delete comment route
router.delete('/:id', async (req, res) => {
    try {
        const comment = await Comment.destroy({
          where: {
            id: req.params.id
          }
        });
        if(!comment) {
          res.status(404).json({ message: 'No comment found with inputed id'});
          return;
        }
        res.status(200).json(comment);
      } catch (err) {
        res.status(500).json(err);
      }
});

module.exports = router;


