const express = require('express')
const router = express.Router();
const { users } = require('../models');
const bcrypt = require('bcrypt');
const {sign} = require('jsonwebtoken')
const validateToken = require('../middleware/AuthMiddleware')

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await users.findOne({ where: { username: username } })
        if (!user) return res.status(200).json({
            error: 'The user doenst exist'
        });
        bcrypt.compare(password, user.password).then((match) => {
            if (!match) return res.status(200).json({ error: "Bad username and password" });
            const accessToken = sign({username: user.username, id: user.id}, 'importantSecret');
            res.status(200).json({
                username: user.username,
                id: user.id,
                accessToken: accessToken
            });

        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.post('/register', async (req, res) => {
    try {
        console.log(req);
        const { username, password, fullname, country } = req.body;
        await bcrypt.hash(password, 10).then((hash) => {
            users.create({
                username: username,
                password: hash,
                fullname: fullname,
                country: country
            })
            return res.status(200).json('success')
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.get('/verify', validateToken, (req, res) => {
    res.status(200).json(req.user);
})
module.exports = router