
const longUrlInput = document.getElementById('longUrl');
const shortenBtn = document.getElementById('shortenBtn');
const shortUrlInput = document.getElementById('shortUrl');
const shortUrlRetrieveInput = document.getElementById('shortUrlInput');
const retrieveBtn = document.getElementById('retrieveBtn');
const resultDiv = document.getElementById('result');



shortenBtn.addEventListener('click', handleShortenUrl);
retrieveBtn.addEventListener('click', handleRetrieveLongUrl);

function handleShortenUrl() {
  const longUrl = longUrlInput.value.trim();
  if (longUrl) {
    const shortUrl = shortenUrl(longUrl);
    shortUrlInput.value = shortUrl;
    resultDiv.textContent = `Short URL for ${longUrl}: ${shortUrl}`;
  } else {
    resultDiv.textContent = 'Please enter a valid long URL.';
  }
}

function handleRetrieveLongUrl() {
  const shortUrl = shortUrlRetrieveInput.value.trim();
  if (shortUrl) {
    const longUrl = getLongUrl(shortUrl);
    resultDiv.textContent = `Long URL for ${shortUrl}: ${longUrl}`;
  } else {
    resultDiv.textContent = 'Please enter a valid short URL.';
  }
}
function shortenUrl() {
  const longUrl = longUrlInput.value.trim();
  if (longUrl) {
    fetch(`/shorten/${encodeURIComponent(longUrl)}`)
      .then(response => response.text())
      .then(shortUrl => {
        shortUrlInput.value = shortUrl;
        resultDiv.textContent = `Short URL for ${longUrl}: ${shortUrl}`;
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.textContent = 'An error occurred while shortening the URL.';
      });
  } else {
    resultDiv.textContent = 'Please enter a valid long URL.';
  }
}
 //"dest": "api/index.js"