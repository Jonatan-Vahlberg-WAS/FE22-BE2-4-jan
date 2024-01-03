import mongoose from 'mongoose';
import express from 'express';

import authRouter from '../routes/auth';
import productRouter from '../routes/product';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/webshop';

async function connectToMongoDB() {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log(err);
    }
}

function setupRoutes(app: express.Application) {
    let prepend = '/api/v1';
    prepend = ""; // for testing purposes
    app.use(`${prepend}/auth`, authRouter);
    app.use(`${prepend}/products`, productRouter);
}

export {
    connectToMongoDB,
    setupRoutes
};