// moodController.js
module.exports = {
    saveReading: async (req, res) => {
        try {
            // Logic to save reading would go here
            console.log('Saving reading:', req.body);
            res.status(201).json({ message: 'Reading saved successfully', data: req.body });
        } catch (error) {
            console.error('Error saving reading:', error);
            res.status(500).json({ message: 'Error saving reading' });
        }
    },

    getHistory: async (req, res) => {
        try {
            // Logic to get history would go here
            const mockHistory = [
                { date: new Date(), reading: 75, mood: 'Calm' },
                { date: new Date(Date.now() - 86400000), reading: 85, mood: 'Stressed' }
            ];
            res.status(200).json(mockHistory);
        } catch (error) {
            console.error('Error getting history:', error);
            res.status(500).json({ message: 'Error getting history' });
        }
    }
};
