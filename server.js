const express = require('express');
const app = express();

// Serve static files from the "public" directory
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.redirect('/about');
});

// Return the about.html file from the views folder
app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/views/about.html');
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Express http server listening on port ${port}`);
});