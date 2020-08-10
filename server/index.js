require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');
const multer = require('multer');
const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/pets', (req, res, next) => {
  const sql = `
 select "petId", "imgUrl", "name"
 from "pets"
 `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

// User can get a list of reminders
app.get('/api/reminder', (req, res, next) => {
  const sql = `
  select "petId", "name", "type", "description", "date", "time", "repeat"
  from "reminder"
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

// User can GET EVERYTHING by pet:Id
app.get('/api/pets/:petId', (req, res, next) => {
  const id = parseInt(req.params.petId, 10);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      error: '"id" must be a positive integer'
    });
  }

  const sql = `
  select *
    from "pets"
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

// User can GET Vet History by id
app.get('/api/vetVisits/:petId', (req, res, next) => {
  const id = parseInt(req.params.petId, 10);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      error: '"id" must be a positive integer'
    });
  }

  const sql = `
  select *
    from "vetVisits"
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

// USER CAN ADD PROFILE
app.post('/api/pets', (req, res, next) => {

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './server/public/images/petImage');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, true);
    } else {
      cb(new Error('File uploaded is not in correct format'), false);
    }
  };
  const upload = multer({
    storage: storage,
    limit: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  }).single('image');
  upload(req, res, function (err) {
    if (err) {
      console.error(err);
      res.status(400).json({
        error: 'Failed to upload the image'
      });
    } else {
      const name = req.body.name;
      const imgUrl = `/images/petImage/${req.file.originalname}`;
      const description = req.body.description;
      const breed = req.body.breed;
      const dateOfBirth = req.body.dateOfBirth;
      // const petId = req.body.petId;
      const userId = 1;
      const sql = `
insert into "pets" ("userId","imgUrl","name","breed","dateOfBirth","description")
values ($1, $2, $3, $4, $5, $6)
returning *
`;
      const params = [userId, imgUrl, name, breed, dateOfBirth, description];
      db.query(sql, params)
        .then(result => {
          const profile = result.rows[0];
          res.status(201).json(profile);
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({
            error: 'An unexpected error occured'
          });
        });
    }
  });
});
// USER CAN VIEW THEIR TODO LIST
app.get('/api/todo', (req, res, next) => {
  const sql = `
  select "todoId","todo","isCompleted"
  from "todo"
  `;
  db.query(sql)
    .then(result => {
      const todo = result.rows;
      res.status(200).json(todo);
    })
    .catch(error => {
      console.error(error);
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
