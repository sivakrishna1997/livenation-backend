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
    concert_title: { type: String, required: [true, "Concert Title is required"], trim: true, index: true },
    concert_type: { type: String, required: [true, "Concert Type is required"], trim: true },
    capacity: { type: String, required: [true, "Capacity is required"] },
    start_date: { type: Date, required: [true, "Start Date is required"] },
    end_date: { type: Date, required: [true, "End Date is required"] },
    country: { type: String, required: [true, "Country is required"] },
    add_to_carousel: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    graphic_content: {
        carousel_poster: { type: String },
        event_poster: { type: String },
        video_url: { type: String },
    },
    about: { type: String },
    main_artist: { type: mongoose.Schema.Types.ObjectId, ref: "artists", required: [true, "Main Artist is required"] },
    genre: { type: mongoose.Schema.Types.ObjectId, ref: "genres", required: [true, "Genre is required"] },
    community: { type: mongoose.Schema.Types.ObjectId, ref: "communities" },
    performers: [{ type: mongoose.Schema.Types.ObjectId, ref: "artists" }],
    venues: [{ type: mongoose.Schema.Types.ObjectId, ref: "venues" }],
    additional_info: [
        {
            title: { type: String },
            description: { type: String }
        }
    ],
    status: { type: String, enum: [{ values: ['pending', 'approved', 'rejected'], message: "Status must be 'pending' or 'approved' or 'rejected'" }], default: 'pending' },
    cdate: { type: Date },
    udate: { type: Date }
}));
//# sourceMappingURL=events.schema.js.map