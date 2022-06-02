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
exports.inventory_purpose = exports.inventory = void 0;
const mongoose = __importStar(require("mongoose"));
exports.inventory = mongoose.model('inventory', new mongoose.Schema({
    incomming_number: {
        type: String,
        required: [true, "Inventory incomming number is required"],
        unique: true,
        trim: true,
    },
    concert: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "events",
        required: [true, "Event is required"]
    },
    inventory_date: { type: Date, required: [true, "Date is required"] },
    purpose: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "inventory_purpose",
        required: [true, "Purpose is required"]
    },
    reference_number: { type: String, trim: true },
    remarks: { type: String, trim: true },
    plu_maintenance: [
        {
            plu_master: { type: mongoose.Schema.Types.ObjectId, ref: "plu_master" },
            incomming_quantity: { type: Number },
            outgoing_quantity: { type: Number },
            remaining_quantity: { type: Number },
            sub_total_unit_price_based: { type: Number },
            sub_total_srp_based: { type: Number },
        }
    ],
    cdate: { type: Date },
    udate: { type: Date }
}));
exports.inventory_purpose = mongoose.model('inventory_purpose', new mongoose.Schema({
    name: { type: String, required: [true, "Purpose Name is required"], trim: true, unique: true },
}));
//# sourceMappingURL=inventory.schema.js.map