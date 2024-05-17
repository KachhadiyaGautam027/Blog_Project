const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }]
});

const commentSchema = new mongoose.Schema({
    content: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' }
});

const Article = mongoose.model('Article', articleSchema);
const User = mongoose.model('User', userSchema);
const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Article, User, Comment };
