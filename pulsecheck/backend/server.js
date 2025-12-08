const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const PORT = config.PORT;
const routes = require('./routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root Route
app.get("/", (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>PulseCheck API</title>
        <style>
            body { font-family: sans-serif; text-align: center; padding: 50px; background-color: #f4f4f9; color: #333; }
            h1 { color: #2c3e50; }
            ul { list-style: none; padding: 0; }
            li { background: white; margin: 10px auto; padding: 10px; width: 300px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
            code { font-weight: bold; color: #e74c3c; }
        </style>
    </head>
    <body>
        <h1>PulseCheck API (v1) 🚀</h1>
        <p>Status: <span style="color: green; font-weight: bold;">Online</span></p>
        <h3>Available Routes:</h3>
        <ul>
            <li>GET <code>/api/users</code></li>
            <li>POST <code>/api/auth/login</code></li>
            <li>GET <code>/api/moods</code></li>
        </ul>
    </body>
    </html>
  `);
});

// Routes
app.use('/api', routes);

// Database Connection
const mongoURI = process.env.MONGO_URI; // MongoDB connection will come from environment
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
