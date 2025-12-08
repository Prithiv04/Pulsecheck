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
