import * as mongoose from 'mongoose';

export const user = mongoose.model('users', new mongoose.Schema({
    firstname: { type: String, trim: true, index: true },
    lastname: { type: String, trim: true, index: true },
    username: { type: String, required: true, unique: true, trim: true, index: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, trim: true },
    mobile: { type: String, unique: true, trim: true },
    gender: { type: String, enum: ['male', 'female', 'others'] },
    dob: { type: Date },
    country: { type: String },
    role: { type: Number, required: true, enum: [1, 2, 3], default: 2 }, // 1 for super admin, 2 for user, 3 second admin
    terms_conditions: { type: Boolean, default: false },
    provider: { type: String, default: '' },
    photo_url: { type: String },
    uid: { type: String },
    email_verified: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    cdate: { type: Date },
    udate: { type: Date }
})
)