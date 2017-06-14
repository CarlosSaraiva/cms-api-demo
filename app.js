const express    = require('express')
const app        = express()
const mongoose   = require('mongoose')
const slug       = require('mongoose-slug-generator');
const bodyParser = require('body-parser')
const mongoUrl   = process.env.NODE_ENV === 'docker-development' ? 'dockerized_mongo' : 'localhost'

//Models
const Post = require('./app/models/post.js')

mongoose.connect(`mongodb://${mongoUrl}/starter-db`)
mongoose.Promise = global.Promise
mongoose.plugin(slug)

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => res.send(`<ul>
                                      <li>GET /api/v1/dogs</li>
                                      <li>POST /api/v1/dog</li>
                                    </ul>`))

app.get('/api/v1/posts', async (req, res) => {
  Post.findAll(req.query)
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(500).json(error))
})

app.post('/api/v1/post/', (req, res) => {
  new Post(req.body)
    .save()
    .then(post => res.status(200).json(post))
    .catch(error => res.status(500).send(error))
})

app.listen(3000, () => console.log('starter-app listening on port 3000!'))
