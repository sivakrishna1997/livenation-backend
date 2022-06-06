import mongoose from 'mongoose';
import * as dotenv from "dotenv";
dotenv.config();

export default function mongodb() {
    const options: mongoose.ConnectOptions = {
        dbName: 'livenation',
        autoIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: true,
        useCreateIndex: true,
    }
    let url: any = process.env.MONGODB_URI;
    mongoose.connect(url, options).then(
        response => {
            console.log('DB connected! "livenation"')
        }, err => {
            console.log(err)
        }
    )
}


