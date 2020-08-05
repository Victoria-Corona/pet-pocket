require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/petProfile', (req, res, next) => {
  const sql = `
 select "petId", "imgUrl", "name"
 from "petProfile"
 `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/petProfile/:petId', (req, res, next) => {
  const id = parseInt(req.params.petId, 10);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      error: '"id" must be a positive integer'
    });
  }

  const sql = `
  select "name",
         "imgUrl",
         "breed",
         "dateOfBirth",
         "description"
    from "petProfile"
    where "petId" = $1
  `;

  const params = [id];

  db.query(sql, params)
    .then(result => {
      const pets = result.rows[0];
      if (!pets) {
        next(new ClientError(`Cannot find pet with id of ${id}`, 404));
      } else {
        res.status(200).json(pets);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occured.'
      });
    });
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
