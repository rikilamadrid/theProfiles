const express = require('express');
const profiles = require('./data/profiles');

const app = express();

app.get('/', (req, res) => {
  res.send('API is running...')
});

app.get('/api/profiles/:id', (req, res) => {
  const profile = profiles.find((profile) => profile.id == req.params.id);
  if (!profile) {
    res.status(404);
    res.json({
      message: 'Oops something went wrong, please try again later.',
    });
  } else {
    res.json(profile);
  }
});

app.get('/api/profiles', (req, res) => {
  if (!profiles) {
    res.status(404);
    res.json({
      message: 'Oops something went wrong, please try again later.',
    });
  } else {
    res.json(profiles);
  }
});

app.listen(5555, console.log('Server running on port 5555'));
