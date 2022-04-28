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
exports.stageroot = exports.venueroot = void 0;
const express = __importStar(require("express"));
const venueroot = express.Router();
exports.venueroot = venueroot;
const stageroot = express.Router();
exports.stageroot = stageroot;
const venue_ctrl_1 = __importDefault(require("./venue.ctrl"));
//venues
venueroot.post('/add', venue_ctrl_1.default.addvenue);
venueroot.post('/get', venue_ctrl_1.default.getvenues);
venueroot.post('/update', venue_ctrl_1.default.updatevenues);
venueroot.post('/delete', venue_ctrl_1.default.deletevenue);
//venue stages
venueroot.post('/add/stage', venue_ctrl_1.default.addvenuestages);
venueroot.post('/delete/stage', venue_ctrl_1.default.deletevenuestages);
//venue seats
venueroot.post('/add/seat', venue_ctrl_1.default.addvenueseats);
venueroot.post('/delete/seat', venue_ctrl_1.default.deletevenueseats);
//stages
stageroot.post('/add', venue_ctrl_1.default.addstages);
stageroot.post('/get', venue_ctrl_1.default.getstages);
stageroot.post('/update', venue_ctrl_1.default.updatestages);
stageroot.post('/delete', venue_ctrl_1.default.deletestages);
//# sourceMappingURL=venue.router.js.map