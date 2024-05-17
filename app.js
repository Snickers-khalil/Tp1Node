const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
const { swaggerUi, specs } = require('./swagger');

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));

const object = [
  { id: 1, name: "khalil", prenom: "barhoumi" },
  { id: 2, name: "Adem", prenom: "barhoumi" },
  { id: 3, name: "Omar", prenom: "barhoumi" },
];


/**
 * @swagger
 * /auth/login:
 *   get:
 *     description: Login to the application
 *     responses:
 *       200:
 *         description: Returns a login page
 */
app.get('/auth/login', (req, res) => {
  res.send('<br><br><br><center><h1>Serveur Run</h1><br><hr><br> <button>see you</button></center>');
});

/**
 * @swagger
 * /auth/register:
 *   get:
 *     description: Register to the application
 *     responses:
 *       200:
 *         description: Returns a registration page
 */
app.get('/auth/register', (req, res) => {
  res.sendFile(__dirname + '/page.html');
});

/**
 * @swagger
 * /post/all:
 *   get:
 *     description: Get all posts
 *     responses:
 *       200:
 *         description: Returns all posts
 */
app.get('/post/all', (req, res) => {
  res.json({ status: 200, message: object });
});

/**
 * @swagger
 * /post/{id}:
 *   get:
 *     description: Get a post by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the post to get
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Returns a post by ID
 *       404:
 *         description: Post not found
 */
app.get('/post/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const result = object.find(item => item.id === id);

  if (result) {
    res.send(`Salut ${result.name} ${result.prenom}!`);
  } else {
    res.status(404).send('Object not found');
  }
});

/**
 * @swagger
 * /:
 *   get:
 *     description: Welcome to the API
 *     responses:
 *       200:
 *         description: Returns a welcome message
 */
app.get('/', (req, res) => {
  res.send("Hello word !!");
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
