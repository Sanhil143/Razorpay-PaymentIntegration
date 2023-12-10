import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import path from 'path';
import razorpayRouter from './src/router';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(
  session({
    secret: 'sanhil',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: process.env.REQUEST_LIMIT || '100kb',
  })
);
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/payment', razorpayRouter);

app.listen(3000, () => {
  console.log('Express app running on console');
});
