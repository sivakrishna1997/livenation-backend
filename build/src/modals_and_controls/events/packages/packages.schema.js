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
exports.packages = void 0;
const mongoose = __importStar(require("mongoose"));
exports.packages = mongoose.model('packages', new mongoose.Schema({
    ticket: { type: mongoose.Schema.Types.ObjectId, ref: "tickets", required: [true, "Ticket is required"] },
    title: { type: String, required: [true, "Package Name is required"], trim: true, index: true },
    price: { type: String },
    price_type: { type: String },
    equivalent_points: { type: String },
    available_quantity: { type: String },
    inclusions: { type: String },
    cdate: { type: Date },
    udate: { type: Date }
}));
//# sourceMappingURL=packages.schema.js.map