// saveReading.js
module.exports = async (req, res) => {
    try {
        // Logic to save reading would go here
        console.log('Saving reading:', req.body);
        res.status(201).json({ message: 'Reading saved successfully', data: req.body });
    } catch (error) {
        console.error('Error saving reading:', error);
        res.status(500).json({ message: 'Error saving reading' });
    }
};
