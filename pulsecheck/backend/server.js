const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', routes);

// Database Connection
mongoose.connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => {
        console.error('❌ MongoDB Connection Error:', err);
        process.exit(1);
    });

// Start Server
app.listen(config.PORT, () => {
    console.log(`🚀 Server running on port ${config.PORT}`);
});
