const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');
const router = express.Router();


router.post('/register', async (req, res) => {
  const { name, email, password, phone } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);
  
  db.query('INSERT INTO users SET ?', { name, email, password: hashedPassword, phone }, (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'User registered!' });
  });
});


router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err || results.length === 0) return res.status(400).send({ message: 'User not found' });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send({ message: 'Invalid credentials' });

    res.send({ message: 'Login successful', user });
  });
});

module.exports = router;
