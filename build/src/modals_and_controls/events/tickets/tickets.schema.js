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
exports.parking_tickets = exports.tickets = void 0;
const mongoose = __importStar(require("mongoose"));
exports.tickets = mongoose.model('tickets', new mongoose.Schema({
    concert: { type: mongoose.Schema.Types.ObjectId, ref: "events", required: [true, "Concert is required"] },
    venue: { type: mongoose.Schema.Types.ObjectId, ref: "venues", required: [true, "Venue is required"] },
    stage_setup: { type: String, trim: true, required: [true, "Stage Set Up is required"] },
    event_date: { type: Date, required: [true, "Event Date is required"] },
    start_time: { type: String, trim: true },
    end_time: { type: String, trim: true },
    areas: [{
            area: { type: String },
            price: { type: String },
            price_type: { type: String },
            points: { type: String },
            rows: [{
                    row_letter: { type: String },
                    seat_number: { type: String },
                    ticket_code: { type: String },
                    ticket_status: { type: String, enum: ['available', 'hold', 'fastfilling', 'sold', 'cancelled', 'expired'] },
                }]
        }],
    cdate: { type: Date },
    udate: { type: Date }
}));
exports.parking_tickets = mongoose.model('parkingtickets', new mongoose.Schema({
    ticket: { type: mongoose.Schema.Types.ObjectId, ref: "tickets", required: [true, "Ticket is required"] },
    parking: { type: mongoose.Schema.Types.ObjectId, ref: "parkings" },
    price: { type: String },
    price_type: { type: String },
    distance: { type: String },
    parking_type: { type: String },
    parking_seats: [{
            type: { type: String, enum: ['vip', 'vallet', 'normal'] },
            seat_number: { type: String },
            ticket_code: { type: String },
            status: { type: String, enum: ['available', 'hold', 'fastfilling', 'sold', 'cancelled', 'expired'] },
        }],
    cdate: { type: Date },
    udate: { type: Date }
}));
//# sourceMappingURL=tickets.schema.js.map