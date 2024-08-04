const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Temporary in-memory storage for user data
const users = [];

// Serve the login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login_page.html'));
});

// Handle login form submission via GET method
app.get('/login', (req, res) => {
    const { id, pw } = req.query;

    // Store user data in memory
    users.push({ id, pw });
    console.log(`Stored User - ID: ${id}, Password: ${pw}`);
    res.send(`User ${id} logged in successfully.`);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
