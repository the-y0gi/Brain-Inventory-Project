import express from 'express';
import mongoDBConnected from './db/db.js'
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.routes.js';
import os from 'os'


mongoDBConnected();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())

app.use('/api', userRouter);



export default app;