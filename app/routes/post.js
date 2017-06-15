/**
 * Dependencies
 */

const router     = require('express').Router();
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');

/**
 * Configuring jsonParser middleware
 */
const jsonParser       = bodyParser.json()

/**
 * Importing the blog post model
 */
const Post = require('../models/post.js');

/**
 * GET '/api/v1/posts'
 * Endpoint which return all the blog posts 
 * @return {Object} JSON
 */

router.get('/posts', (req, res) => {
  Post.findAll(req.query)
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(500).json(error));
});

/**
 * GET '/api/v1/post/:id'
 * Request the blog post by id
 * @param  {String} req.params.id - Blog post id
 * @return {Object} JSON
 */

router.get('/post/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.status(200).json(post))
    .catch(error => res.status(500).json(error));
});

/**
 * POST '/api/v1/post'
 * Receives a POST request of the new blog post, saves to db, responds back
 * @param  {Object} req. An object containing the different attributes of a blog post
 * @return {Object} JSON
 */

router.post('/post', jsonParser, (req, res) => {
  new Post(req.body)
    .save()
    .then(post => res.status(200).json(post))
    .catch(error => res.status(500).json(error));
});

/**
 * POST '/api/v1/post/:id'
 * Update a blog post by id and returns the updated document
 * @param  {String} req.params.id - Blog post id
 * @return {Object} JSON
 */

router.put('/post/:id', jsonParser, (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(500).json(error));
});

/**
 * DELETE '/api/v1/post/:id'
 * Delete a blog post and return the deleted document
 * @param  {String} req.params.id - Blog post id
 * @return {Object} JSON
 */

router.delete('/post/:id', (req, res) => {
  Post.findByIdAndRemove(req.params.id, req.body)
    .then(post => res.status(200).json(post))
    .catch(error => res.status(500).json(error));
})

module.exports = router;