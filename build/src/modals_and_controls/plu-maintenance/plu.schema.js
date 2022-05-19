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
exports.plu_sub_departments = exports.plu_departments = exports.plu_sub_categories = exports.plu_categories = exports.plu_brands = exports.plu_sizes = exports.plu_colors = exports.plu_master = void 0;
const mongoose = __importStar(require("mongoose"));
exports.plu_master = mongoose.model('plu_master', new mongoose.Schema({
    bracode: { type: String, required: [true, "Brand Code is required"], trim: true, unique: true },
    name: { type: String, required: [true, "Master Name is required"], trim: true, index: true },
    description: { type: String },
    size: { type: mongoose.Schema.Types.ObjectId, ref: 'plu_sizes', required: [true, "Size is required"] },
    color: { type: mongoose.Schema.Types.ObjectId, ref: 'plu_colors', required: [true, "Color is required"] },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'plu_brands', required: [true, "Brand is required"] },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'plu_categories', required: [true, "Category is required"] },
    sub_category: { type: mongoose.Schema.Types.ObjectId, ref: 'plu_sub_categories', required: [true, "Sub Category is required"] },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'plu_departments', required: [true, "Department is required"] },
    sub_department: { type: mongoose.Schema.Types.ObjectId, ref: 'plu_sub_departments', required: [true, "Sub Department is required"] },
    unit_price: { type: Number, required: [true, "Unit Price is required"] },
    tax: { type: Number, required: [true, "Tax is required"] },
    srp: { type: Number, required: [true, "SRP is required"] },
    expiration: { type: Date, required: [true, "Expiration is required"] },
    discount_details: {
        from_date: { type: Date, required: [true, "Discount From Date is required"] },
        to_date: { type: Date, required: [true, "Discount To Date is required"] },
        discount: { type: Number, required: [true, "Discount is required"] },
        vip_discount: { type: Number, required: [true, "VIP Discount is required"] },
    },
    images: [{ type: String }],
    cdate: { type: Date },
    udate: { type: Date }
}));
exports.plu_colors = mongoose.model('plu_colors', new mongoose.Schema({
    name: { type: String, required: [true, "Color Name is required"], trim: true, unique: true }
}));
exports.plu_sizes = mongoose.model('plu_sizes', new mongoose.Schema({
    name: { type: String, required: [true, "Size Name is required"], trim: true, unique: true }
}));
exports.plu_brands = mongoose.model('plu_brands', new mongoose.Schema({
    name: { type: String, required: [true, "Brand Name is required"], trim: true, unique: true },
    description: { type: String }
}));
exports.plu_categories = mongoose.model('plu_categories', new mongoose.Schema({
    name: { type: String, required: [true, "Category Name is required"], trim: true, unique: true },
    description: { type: String },
    sub_categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "plu_sub_categories" }]
}));
exports.plu_sub_categories = mongoose.model('plu_sub_categories', new mongoose.Schema({
    name: { type: String, required: [true, "Sub Category Name is required"], trim: true, unique: true },
    description: { type: String }
}));
exports.plu_departments = mongoose.model('plu_departments', new mongoose.Schema({
    name: { type: String, required: [true, "Department Name is required"], trim: true, unique: true },
    description: { type: String },
    sub_departments: [{ type: mongoose.Schema.Types.ObjectId, ref: "plu_sub_departments" }]
}));
exports.plu_sub_departments = mongoose.model('plu_sub_departments', new mongoose.Schema({
    name: { type: String, required: [true, "Sub Department Name is required"], trim: true, unique: true },
    description: { type: String }
}));
//# sourceMappingURL=plu.schema.js.map