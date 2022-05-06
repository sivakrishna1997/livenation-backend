"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const mongoose = __importStar(require("mongoose"));
exports.user = mongoose.model('users', new mongoose.Schema({
    firstname: { type: String, trim: true, index: true },
    lastname: { type: String, trim: true, index: true },
    username: { type: String, required: true, trim: true, index: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, trim: true },
    mobile: { type: String, trim: true },
    gender: { type: String, enum: ['male', 'female', 'others'] },
    dob: { type: Date },
    country: { type: String },
    role: { type: Number, required: true, enum: [1, 2, 3], default: 2 },
    terms_conditions: { type: Boolean, default: false },
    provider: { type: String, default: '' },
    photo_url: { type: String },
    uid: { type: String },
    email_verified: { type: Boolean, default: false },
    preferred_genres: [{ name: { type: String } }],
    subscription: { type: String, enum: ['free', 'vip', 'gold', 'silver', 'bronze'] },
    active: { type: Boolean, default: true },
    cdate: { type: Date },
    udate: { type: Date }
}));
//# sourceMappingURL=user.schema.js.map