import fetch from 'node-fetch';
import express from 'express';

const app = express();
const port = 3000;

const logRequest = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // Call the next middleware in the chain
};
app.use(logRequest);

app.use(express.json());

// Define a route
app.get('/user-tweet', (req, res) => {
  const username = req.query.username
  const page = req.query.page
  const after = req.query.after
  // console.log(`${username} - ${page} - ${after}`)
  fetch(`https://api.sotwe.com/v3/user/${username}/?after=${after}&page=${page}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    res.status(200).send(data);
  })
  .catch(error => {
    res.status(502).send("Error");
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});