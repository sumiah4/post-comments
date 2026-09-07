const express = require('express');
const router = express.Router();
const  { posts, likes }  = require('../models');

// Create a new post
router.post('/', async(req, res) => {
    const post = req.body;
    console.log(post);
    await posts.create(post);
    return res.status(200).json({
        message : 'success',
        data : res.data
    });
});

//Get all posts
router.get('/', async(req,res) => {
    const list = await posts.findAll({
        include : [likes],
        attributes: ['id', 'title', 'content', 'username', 'createdAt', 'updatedAt']
    });
    return res.json(list)
    
});

//Get a single Post
router.get('/viewpost/:id', async(req, res) => {
    const id = req.params.id;
    const post = await posts.findByPk(id);
    return res.json(post);
})

module.exports = router;