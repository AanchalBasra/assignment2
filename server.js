const express = require('express');
const app = express();

// Serve static files from the "public" directory
const storeService = require('./store-service');

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

app.get('/shop', (req, res) => {
  storeService.getPublishedItems()
    .then(publishedItems => {
      res.json(publishedItems);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error retrieving published items' });
    });
});

app.get('/items', (req, res) => {
  storeService.getAllItems()
    .then(allItems => {
      res.json(allItems);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error retrieving all items' });
    });
});

app.get('/categories', (req, res) => {
  storeService.getCategories()
    .then(allCategories => {
      res.json({ categories: allCategories });
    })
    .catch(error => {
      res.status(500).json({ error: 'Error retrieving categories' });
    });
});

app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

storeService.initialize()
  .then(() => {
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log(`Express http server listening on port ${port}`);
    });
  })
  .catch(error => {
    console.error('Failed to initialize store service:', error);
  });
