import express from 'express';
import session from 'express-session';

import {connectToMongoDB, setupRoutes} from './config/database';

// Create Express server
const app = express();
const PORT = process.env.PORT || 3000;

// Express configuration to parse the incoming requests with JSON payloads
app.use(express.json());

// setup express-session middleware to use session cookies
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Connect to MongoDB
connectToMongoDB();
setupRoutes(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});