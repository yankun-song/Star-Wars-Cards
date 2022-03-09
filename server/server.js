const path = require('path');
const express = require('express');

const app = express();

const fileController = require('./controllers/fileController');

const PORT = 3000;

/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * handle requests for static files
 */
app.use(express.static(path.resolve(__dirname, 'client')));

/**
 * define route handlers
 */
app.get('/api/characters',
  fileController.getCharacters,
  (req, res) => res.status(200).json({ characters: [...res.locals.characters] }),
  // eslint-disable-next-line function-paren-newline
);

app.post('/api/info',
  fileController.getHomeworldAndFilms,
  (req, res) => res.status(200).json({ ...res.locals.info }),
  // eslint-disable-next-line function-paren-newline
);

// respond with main app
app.get('/', (req, res) => (
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'))
));

/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
