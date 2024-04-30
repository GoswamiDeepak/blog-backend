import app from './src/app.js';
import { config } from './src/app-config/config.js';
import { connectDB } from './src/app-config/db.js';

connectDB()
    .then(() => {
        app.listen(config.port, () => {
            console.log(`Listening on Port: ${config.port}`);
        });
    })
    .catch((error) => console.log('MONGO DB Connection Failed!!!!', error));
