import express, { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import cors from 'cors';
import router from '../router';
import { corsAllowedOrigins } from './config';

process.on('uncaughtException', (e) => {
   console.error(e);
});

const app = express();

app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true, parameterLimit: 5000 }));
var allowedOrigins = ['http://localhost:3000', 'http://localhost:8080'];
app.use(
   cors({
      origin: function (origin, callback) {
         if (!origin) return callback(null, true);
         if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' + 'allow access from the specified Origin.';
            return callback(new Error(msg), false);
         }
         return callback(null, true);
      },
   }),
);
app.use('', router);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => res.status(404).json({ message: 'Not Found Error' }));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
   res.status(500).json({ message: 'Internal error' });
});

export default app;
