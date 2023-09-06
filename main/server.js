const path = require('path');
const express = require('express');
const session = require('express-session');
const exphandlebars = require('express-handlebars');
const routes = require('./controllers');

const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.json);
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('./routes');

sequelize.sync({ force: fasle })
.then(() => {
    app.listen(PORT, () => console.log('Now Listening'))
});