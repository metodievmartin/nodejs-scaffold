const authRoutes = require('../routes/authRoutes');
const viewRoutes = require('../routes/viewRoutes');

module.exports = (app) => {
  app.use('/', viewRoutes);
  app.use('/api/auth', authRoutes);
};