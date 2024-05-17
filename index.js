const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./config/db');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3007;
const authController = require('./controllers/authController');
const { authenticateJWT, authorizeRoles } = require('./middleware/middleware');
const Article = require('./models/user');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/register', (req, res) => res.render('register'));
app.post('/register', authController.register);
// app.get('/login', (req, res) => res.render('login'));
app.get('/login', (req, res) => {
  const user = req.user || null;
  res.render('login', { user: user });
});
app.post('/login', authController.login);
app.get('/logout', authController.logout);

app.get('/articles', authenticateJWT, (req, res) => {
  res.render('articles', { user: req.user });
});

app.get('/admin', authenticateJWT, authorizeRoles('admin'), (req, res) => {
  res.send('Admin area');
});

app.get('/my-articles', authenticateJWT, async (req, res) => {
  const articles = await Article.find({ author: req.user.userId });
  res.render('myArticles', { articles });
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
