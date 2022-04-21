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
Object.defineProperty(exports, "__esModule", { value: true });
exports.artist = void 0;
const mongoose = __importStar(require("mongoose"));
exports.artist = mongoose.model('artist', new mongoose.Schema({
    name: { type: String, required: true, trim: true, index: true },
    description: { type: String },
    photo_url: { type: String },
    social_media: {
        facebook: { type: String },
        twitter: { type: String },
        instagram: { type: String },
        youtube: { type: String },
        soundcloud: { type: String },
        bandcamp: { type: String },
        spotify: { type: String },
        tumblr: { type: String },
        musicradar: { type: String },
    },
    cdate: { type: Date },
    udate: { type: Date }
}));
//# sourceMappingURL=artist.schema.js.map