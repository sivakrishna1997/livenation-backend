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
exports.events = void 0;
const mongoose = __importStar(require("mongoose"));
exports.events = mongoose.model('events', new mongoose.Schema({
    concert_title: { type: String, required: true, trim: true, index: true },
    concert_type: { type: String, required: true, trim: true },
    main_artist: { type: String, required: true },
    capacity: { type: String },
    genre: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    country: { type: String },
    community: { type: String },
    add_to_carousel: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    graphic_content: {
        carousel_poster: { type: String },
        event_poster: { type: String },
        banner_poster: { type: String },
        video_url: { type: String },
    },
    about: { type: String },
    performers: [
        {
            artist_id: { type: String },
            artist_name: { type: String }
        }
    ],
    venues: [
        {
            venue_id: { type: String },
            venue_name: { type: String }
        }
    ],
    additional_info: [
        {
            title: { type: String },
            description: { type: String }
        }
    ],
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    cdate: { type: Date },
    udate: { type: Date }
}));
//# sourceMappingURL=events.schema.js.map