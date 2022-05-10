import * as dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction } from "express";
import express_fileupload from 'express-fileupload';
import cors from "cors";
import helmet from "helmet";
const path = require('path');
const passport = require('passport');
import passportstrategy from './service/passport.service';
import mongodb from './service/mongoose.service'
import router from "./routes";
import fileuploadroutes from './fileuploadroutes';


if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();
mongodb();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
// app.use(cors(
//     {
//         origin: ['*', 'http:localhost:4200', 'https://res.cloudinary.com/', 'https://testlivenation.herokuapp.com/'],
//         // origin: "*",
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Headers', 'Access-Control-Allow-Methods', 'Access-Control-Allow-Credentials']
//     } as cors.CorsOptions
// ));

// var allowCrossDomain = function (req: Request, res: Response, next: NextFunction) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// }
// app.use(allowCrossDomain);

app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ extended: true, limit: '500mb' }));

//start Passport middleware for authentication
passportstrategy(passport);
app.use(passport.initialize());
// end Passport

//routes
app.use('/api', router);
//file Upload Routs
app.use(express_fileupload({ useTempFiles: true, tempFileDir: '/tmp/' }));
app.use('/api/fileupload', fileuploadroutes);


app.use(express.static(path.join(__dirname, '../public')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

