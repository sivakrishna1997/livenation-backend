import * as mongoose from 'mongoose';
import validator from 'validator';

export const user = mongoose.model('users', new mongoose.Schema({
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
        validate: [validator.isEmail, 'Invalid email address']
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
        validate: [validator.isMobilePhone, 'Invalid mobile number']
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
    role: { type: Number, required: true, enum: [1, 2, 3], default: 2 }, // 1 for super admin, 2 for user, 3 second admin
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
})
)