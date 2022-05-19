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
exports.stages = exports.venues = void 0;
const mongoose = __importStar(require("mongoose"));
exports.venues = mongoose.model('venues', new mongoose.Schema({
    name: { type: String, required: [true, "Venue Name is required"], trim: true, index: true, unique: true },
    location: { type: String, index: true },
    capacity: { type: String },
    stage_layout: { type: String },
    stages: [{ type: mongoose.Schema.Types.ObjectId, ref: "stages" }],
    seats: [
        {
            name: { type: String, trim: true },
            image: { type: String }
        }
    ],
    cdate: { type: Date },
    udate: { type: Date }
}));
exports.stages = mongoose.model('stages', new mongoose.Schema({
    name: { type: String, required: [true, "Stage Name is required"], trim: true },
    cdate: { type: Date },
    udate: { type: Date }
}));
//# sourceMappingURL=venue.schema.js.map