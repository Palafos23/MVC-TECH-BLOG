const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userData = require('./user.json');
const postData = require('./post.json');
const commentData = require('./comment');
const seedCommentData = require('./comment');

const seedAllData = async () => {
    await sequelize.sync({ force: true });
    
    await User.bulkCreate(userData);

    await Post.bulkCreate(postData);

    await seedCommentData();
    
    process.exit(0);
}
seedAllData();