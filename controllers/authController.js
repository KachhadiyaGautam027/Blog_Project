const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const { User } = require('../models/user');

const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username, password });
        await user.save();
        res.redirect('/login');
    } catch (error) {
        res.status(500).send(error);
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(400).send('Invalid credentials');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid credentials');

        const token = jwt.sign({ userId: user._id, role: user.role }, 'secretKey', { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error);
    }
};

// Logout Controller
const logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
};

module.exports = { register, login, logout };
