const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./user.json');
const postData = require('./post.json');
const commentData = require('./comment.json');

const seedAllData = async () => {
    await sequelize.sync({ force: true });
    
    await User.bulkCreate(userData);

    await Post.bulkCreate(postData);

    await Comment.bulkCreate(commentData);
    
    process.exit(0);
}
seedAllData();