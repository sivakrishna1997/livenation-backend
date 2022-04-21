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
exports.tickets = void 0;
const mongoose = __importStar(require("mongoose"));
exports.tickets = mongoose.model('tickets', new mongoose.Schema({
    concert_id: { type: String, required: true },
    concert_title: { type: String, required: true, trim: true },
    concert_venue_id: { type: String, required: true },
    concert_venue_name: { type: String, required: true, trim: true },
    stage_setup: { type: String, trim: true },
    event_date: { type: Date, required: true },
    start_time: { type: String, trim: true },
    end_time: { type: String, trim: true },
    areas: [{
            area: { type: String },
            price: { type: String },
            points: { type: String },
            rows: [{
                    row_letter: { type: String },
                    seat_number: { type: String },
                    ticket_code: { type: String },
                    ticket_status: { type: String, enum: ['available', 'sold'] },
                }]
        }],
    cdate: { type: Date },
    udate: { type: Date }
}));
//# sourceMappingURL=tickets.schema.js.map