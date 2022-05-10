import mongoose from 'mongoose';

export default function mongodb() {
    const options: mongoose.ConnectOptions = {
        dbName: 'livenation',
        autoIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
    // let url = "mongodb://localhost:27017/livenation";
    let url = "mongodb+srv://tal:tal@cluster0.jmvgw.mongodb.net/livenation";
    mongoose.connect(url, options).then(
        response => {
            console.log('DB connected! "livenation"')
        }, err => {
            console.log(err)
        }
    )
}


