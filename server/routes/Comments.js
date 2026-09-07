const express = require('express');
const routers = express.Router();
const { comments, users } = require('../models');
const validateToken = require('../middleware/AuthMiddleware');
const { Model } = require('sequelize');

routers.get('/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const allComments = await comments.findAll({
            where: {
                postId: postId
            },
            include : [{
                model: users, 
                attributes: ['id', 'username']
            }]
        })
        return res.json(allComments)
    } catch (err) {
        console.log(err);
        return res.status(500).json({'error': err.message});
    }
})

routers.post('/', validateToken, async(req, res) => {
    try {
        const data = req.body;
        console.log('data', data);
        const result = await comments.create(data);
        res.status(200).json(result)
    } catch (err) {
        console.error(err);
        res.status(500).json({error : 'Failed to add comments'})
    }
})

routers.delete('/:commentId', validateToken, async(req,res) => {
    try {
    const id = req.params.commentId;
    await comments.destroy({
        where: {id: id}
    })
    res.status(200).json('success')
}catch (err) {
    res.status(500).json({error: err.message})
}

})
module.exports = routers;