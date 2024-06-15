// Hash table to store URL mappings
const urlMap = new Map();
require("dotenv").config();
// Base URL for shortened links
const baseUrl = process.env.Base_Url;

// Character set for short URLs
const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

// Function to generate a unique short URL
function generateShortUrl() {
  let shortUrl = '';
  const targetLength = 6; // Length of the short URL

  for (let i = 0; i < targetLength; i++) {
    shortUrl += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  // Handle collisions by regenerating the short URL if it already exists
  if (urlMap.has(shortUrl)) {
    return generateShortUrl();
  }

  return shortUrl;
}

// Function to shorten a long URL
function shortenUrl(longUrl) {
  const shortUrl = generateShortUrl();
  urlMap.set(shortUrl, longUrl);
  return `${baseUrl}${shortUrl}`;
}

// Function to retrieve the long URL from a short URL
function getLongUrl(shortUrl) {
  const shortUrlKey = shortUrl.replace(baseUrl, '');
  return urlMap.get(shortUrlKey) || 'Invalid short URL';
}