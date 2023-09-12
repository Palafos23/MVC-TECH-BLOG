const { Comment } = require('../models');
  
  
const commentData =  [
    {
      "comment_content": "Blogging is fun!",
      "user_id": 1,
      "post_id": 1
    },
    {
      "comment_content": "Nice to meet you",
      "user_id": 2,
      "post_id": 2
    },
    {
      "comment_content": "Nice blog!",
      "user_id": 3,
      "post_id": 3
    }
  ];

const seedCommentData = () => Comment.bulkCreate(commentData);

module.exports = seedCommentData;
