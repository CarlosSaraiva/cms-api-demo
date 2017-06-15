/**
 * Dependencies
 */

const express    = require('express');
const app        = express();
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const mongoUrl   = process.env.NODE_ENV === 'docker-development' ? 'dockerized_mongo' : 'localhost';

/**
 * Routes
 */
const Post = require('./app/routes/post.js')

/**
 * Configuring moongose
 */
mongoose.connect(`mongodb://${mongoUrl}/cms-api-demo`);
mongoose.Promise = global.Promise;

/**
 * Main path returing a html with all routes
 */

const template = `
  <ul>
    <li>GET ------ /api/v1/post</li>
    <li>GET ------ /api/v1/post/:id</li>
    <li>POST ----- /api/v1/post</li>
    <li>PUT ------ /api/v1/dog/:id</li>
    <li>DELETE -- /api/v1/dog/:id</li>
  </ul>`

app.get('/', (req, res) => res.send(template));

/**
 * Endpoints or future endpoints initialized here
 */
app.use('/api/v1', require('./app/routes/post.js'));

/**
 * If a path was not found, throw 404
 */
  
app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

/**
 * If something goes wrong, it should be ended here
 */

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    message: err.message,
    title: 'error'
  })
});

/**
 * The next line it's  where all the dreams finally becomes aware of the world wide web
 */

app.listen(3000, () => console.log('cms-api-demo listening on port 3000!'));