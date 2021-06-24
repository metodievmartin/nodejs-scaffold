const express = require('express');
const { PORT } = require('./config');
const databaseConfig = require('./config/databaseConfig');
const expressConfig = require('./config/expressConfig');
const routesConfig = require('./config/routesConfig');

start();

async function start() {
    // Initialize the app
    const app = express();

    // Initialize and configure the DB connection
    await databaseConfig(app);

    // Attach global middlewares
    expressConfig(app);

    // Register the routes and their controllers
    routesConfig(app);

    // Start the app
    app.listen(PORT, () => {
        console.log(`Application running on: http://localhost:${PORT}`);
    });
}

