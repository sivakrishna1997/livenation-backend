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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const inventory = express.Router();
const inventory_ctrl_1 = __importDefault(require("./inventory.ctrl"));
//Inventory
inventory.post('/add', inventory_ctrl_1.default.add_inventory);
inventory.post('/get', inventory_ctrl_1.default.get_inventory);
inventory.post('/update', inventory_ctrl_1.default.update_inventory);
inventory.post('/delete', inventory_ctrl_1.default.delete_inventory);
//Inventory Purpose
inventory.post('/purpose/add', inventory_ctrl_1.default.add_inventory_purpose);
inventory.post('/purpose/get', inventory_ctrl_1.default.get_inventory_purpose);
inventory.post('/purpose/update', inventory_ctrl_1.default.update_inventory_purpose);
inventory.post('/purpose/delete', inventory_ctrl_1.default.delete_inventory_purpose);
exports.default = inventory;
//# sourceMappingURL=inventory.router.js.map