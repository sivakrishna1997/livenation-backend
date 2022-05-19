"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const mongoose = __importStar(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
exports.user = mongoose.model('users', new mongoose.Schema({
    firstname: { type: String, trim: true, index: true },
    lastname: { type: String, trim: true, index: true },
    username: {
        type: String,
        required: [true, 'User Name is required'],
        unique: true,
        trim: true, index: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true, lowercase: true,
        validate: [validator_1.default.isEmail, 'Invalid email address']
    },
    password: {
        type: String, trim: true,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },
    mobile: {
        type: String,
        required: [true, 'Mobile Number is required'],
        minlength: [10, 'Mobile Number must be at least 10 digits'],
        maxlength: [15, 'Mobile Number must be under 15 digits'],
        unique: true,
        validate: [validator_1.default.isMobilePhone, 'Invalid mobile number']
    },
    gender: {
        type: String, enum: {
            values: ['male', 'female', 'others'],
            message: "Gender must be 'male' or 'female' or 'others'"
        },
        required: [true, "Gender is required"]
    },
    dob: { type: Date, required: [true, "Date Of Birth is required"] },
    country: { type: String },
    role: { type: Number, required: true, enum: [1, 2, 3], default: 2 },
    terms_conditions: { type: Boolean, default: false },
    provider: { type: String, default: '' },
    photo_url: { type: String },
    uid: { type: String },
    email_verified: { type: Boolean, default: false },
    preferred_genres: [{ type: mongoose.Schema.Types.ObjectId, ref: "genres" }],
    subscription: { type: String, enum: ['free', 'vip', 'gold', 'silver', 'bronze'], default: 'free' },
    active: { type: Boolean, default: true },
    cdate: { type: Date },
    udate: { type: Date }
}));
//# sourceMappingURL=user.schema.js.map