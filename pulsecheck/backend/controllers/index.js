module.exports = {
    saveReading: require('./saveReading'),
    getHistory: require('./getHistory'),
    ...require('./userController'),
    ...require('./moodController'),
    ...require('./authController'),
};
