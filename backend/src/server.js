require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');
const { redisClient } = require('./services/redisService');

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    await redisClient.connect();
    console.log('Redis connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Startup error:', err);
    process.exit(1);
  }
})(); 