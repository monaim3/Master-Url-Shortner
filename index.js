
const express = require('express');
const app = express();
const path = require('path');
require("dotenv").config();
const urlMap = new Map();
const baseUrl = process.env.Base_Url;

const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname,  'View')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,  'View', 'index.html'));
});
app.get('/test', (req, res) => {
  res.send("hello")
});

app.get('/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl;
  const longUrl = urlMap.get(shortUrl);

  if (longUrl) {
    res.redirect(longUrl);
  } else {
    res.status(404).send('Invalid short URL');
  }
});

app.get('/shorten/:longUrl', (req, res) => {
  const longUrl = req.params.longUrl;
  const shortUrl = generateShortUrl();
  urlMap.set(shortUrl, longUrl);
  res.send(`${baseUrl}${shortUrl}`);
});

function generateShortUrl() {
  let shortUrl = '';
  const targetLength = 6;

  for (let i = 0; i < targetLength; i++) {
    shortUrl += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  if (urlMap.has(shortUrl)) {
    return generateShortUrl();
  }

  return shortUrl;
}
const port=process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});


