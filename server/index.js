require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');
const multer = require('multer');
const app = express();

const reminder = [];

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

// User can get reminder by petID
app.get('/api/reminder/:petId', (req, res, next) => {
  const id = parseInt(req.params.petId, 10);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      error: '"id" must be a positive integer'
    });
  }

  const sql = `
  select *
    from "reminder"
    where "petId" = $1
    `;

  const params = [id];

  db.query(sql, params)
    .then(result => {
      const reminder = result.rows[0];
      if (!reminder) {
        next(new ClientError(`Cannot find reminder with id of ${id}`, 404));
      } else {
        res.status(200).json(reminder);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error has occurred.'
      });
    });
});

// User can post new reminder
app.post('/api/reminder', (req, res, next) => {
  const result = req.body;
  reminder.push(result);
  res.status(201);
  res.json(result);
});

// User can DELETE a pet profile! :(
app.delete('/api/pets/:petId', (req, res, next) => {
  const id = parseInt(req.params.petId, 10);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      error: '"petId" must be a positive integer'
    });
  }

  const sql = `
  delete from "pets"
  where "petId" = $1
  returning *;
  `;

  const params = [id];

  db.query(sql, params)
    .then(result => {
      const pets = result.rows[0];
      if (!pets) {
        next(new ClientError(`Cannot find pet with petId of ${id}`, 404));
      } else {
        res.status(204).json(pets);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occured.'
      });
    });
});

// User can GET everything by pet:Id
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

// User can GET all the vetVisits
app.get('/api/vetVisits', (req, res, next) => {
  const sql = `
 select *
 from "vetVisits"
 `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

// User can GET Vet History by petid
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
    where "vetVisitId" = $1
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

// User can GET vetVisit by ID
// app.get('/api/vetVisits/:vetVisitId', (req, res, next) => {
//   const id = parseInt(req.params.petId, 10);
//   if (!Number.isInteger(id) || id <= 0) {
//     return res.status(400).json({
//       error: '"id" must be a positive integer'
//     });
//   }

//   const sql = `
//   select *
//     from "vetVisits"
//     where "vetVisitId" = $1
//   `;

//   const params = [id];

//   db.query(sql, params)
//     .then(result => {
//       const pets = result.rows[0];
//       if (!pets) {
//         next(new ClientError(`Cannot find pet with id of ${id}`, 404));
//       } else {
//         res.status(200).json(pets);
//       }
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({
//         error: 'An unexpected error occured.'
//       });
//     });
// });

// User can ADD a Vet Visit
app.post('/api/vetVisits', (req, res, next) => {

  const petId = req.body.petId;
  const date = req.body.date;
  const reason = req.body.reason;
  const notes = req.body.notes;

  if (!date) {
    return res.status(400).json({
      error: 'Vet Visit must include a date'
    });
  }

  if (!reason) {
    return res.status(400).json({
      error: 'Must include a reason for Vet Visit'
    });
  }

  const sql = `
    insert into "vetVisits" ("petId","date","reason","notes")
    values ($1, $2, $3, $4)
    returning *
    `;

  const params = [petId, date, reason, notes];

  db.query(sql, params)
    .then(result => {
      const visitInfo = result.rows[0];
      res.status(201).json(visitInfo);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred'
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
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/gif') {
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
      const imgUrl = req.file
        ? `/images/petImage/${req.file.originalname}`
        : null;
      const description = req.body.description;
      const breed = req.body.breed;
      const dateOfBirth = req.body.dateOfBirth;
      const userId = 1;

      const bloodType = req.body.bloodType;
      const allergies = req.body.allergies;
      const medication = req.body.medication;
      const vaccines = req.body.vaccines;
      const specializedDiet = req.body.specializedDiet;

      const sql = `
insert into "pets" ("userId","imgUrl","name","breed","dateOfBirth","description","bloodType","allergies","medication","vaccines","specializedDiet")
values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
returning *
`;
      const params = [userId, imgUrl, name, breed, dateOfBirth, description, bloodType, allergies, medication, vaccines, specializedDiet];
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
// USER CAN EDIT THEIR PET PROFILE
app.put('/api/pets/:petId', express.urlencoded({ extended: true }), (req, res, next) => {
  const petId = Number(req.params.petId);
  if (!Number.isInteger(petId) || petId <= 0) {
    return res.status(400).json({
      error: '"petId" must be a positive integer'
    });
  }
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './server/public/images/petImage');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/gif') {
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
      const description = req.body.description;
      const breed = req.body.breed;
      const dateOfBirth = req.body.dateOfBirth;
      const imgUrl = req.file
        ? `/images/petImage/${req.file.originalname}`
        : null;
      const sql = `
      update "pets"
      set "imgUrl" = coalesce($1, "imgUrl"), "name" = $2, "breed" = $3, "dateOfBirth" = $4, "description" = $5
      where "petId" = $6
      returning *
      `;
      const params = [imgUrl, name, breed, dateOfBirth, description, petId];
      db.query(sql, params)
        .then(result => {
          const profile = result.rows[0];
          res.status(200).json(profile);
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
