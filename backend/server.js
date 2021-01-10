const express = require('express');
const profiles = require('./data/profiles');

const app = express();

app.get('/', (req, res) => {
  res.send('API is running...')
});

app.get('/api/profiles/:id', (req, res) => {
  const profile = profiles.find((profile) => profile.id == req.params.id)
  res.json(profile);
});

app.get('/api/profiles', (req, res) => {
  res.json(profiles);
});

app.listen(5555, console.log('Server running on port 5555'));
