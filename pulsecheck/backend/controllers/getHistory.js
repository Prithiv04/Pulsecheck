// getHistory.js
module.exports = async (req, res) => {
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
};
