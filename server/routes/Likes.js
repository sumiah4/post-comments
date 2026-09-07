const express = require('express')
const router = express.Router();
const { likes } = require('../models')
const validateToken = require('../middleware/AuthMiddleware')

router.post('/', validateToken, async (req, res) => {
    try {
        const {postId} = req.body;
        const userId = req.user.id;
        const found = await likes.findAll({
            where: { userId: userId, postId: postId }
        })
        if (found.length == 0) {
            await likes.create({ userId: userId, postId: postId })
            res.status(200).json({ message: 'like' })
        } else {
            likes.destroy({
                where: { userId: userId, postId: postId }
            })
            res.status(200).json({ message: 'unlike' })

        }
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

module.exports = router