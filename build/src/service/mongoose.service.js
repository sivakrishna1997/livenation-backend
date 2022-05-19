"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
function mongodb() {
    const options = {
        dbName: 'livenation',
        autoIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: true,
        useCreateIndex: true,
    };
    let url = "mongodb://localhost:27017/livenation";
    // let url = "mongodb+srv://tal:tal@cluster0.jmvgw.mongodb.net/livenation";
    mongoose_1.default.connect(url, options).then(response => {
        console.log('DB connected! "livenation"');
    }, err => {
        console.log(err);
    });
}
exports.default = mongodb;
//# sourceMappingURL=mongoose.service.js.map