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
exports.parking = void 0;
const mongoose = __importStar(require("mongoose"));
exports.parking = mongoose.model('parkings', new mongoose.Schema({
    name: { type: String, trim: true, required: [true, "Parking Name is required"] },
    image: { type: String },
    location: { type: String },
    description: { type: String },
    parking_slot_for_packages: { type: Number },
    vallet_parking_slots: { type: Number },
    vip_parking_slots: { type: Number },
    // start_time: { type: String, trim: true },
    // end_time: { type: String, trim: true },
    cdate: { type: Date },
    udate: { type: Date }
}));
//# sourceMappingURL=parking.schema.js.map