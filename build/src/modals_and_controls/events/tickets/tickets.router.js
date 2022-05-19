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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parkingticketroot = exports.ticketroot = void 0;
const express = __importStar(require("express"));
const ticketroot = express.Router();
exports.ticketroot = ticketroot;
const parkingticketroot = express.Router();
exports.parkingticketroot = parkingticketroot;
const tickets_ctrl_1 = __importDefault(require("./tickets.ctrl"));
//tickets
ticketroot.post('/add', tickets_ctrl_1.default.addticket);
ticketroot.post('/get', tickets_ctrl_1.default.gettickets);
ticketroot.post('/update', tickets_ctrl_1.default.updatetickets);
ticketroot.post('/delete', tickets_ctrl_1.default.deletetickets);
// parking tickets
parkingticketroot.post('/add', tickets_ctrl_1.default.addparking_tickets);
parkingticketroot.post('/get', tickets_ctrl_1.default.getparking_tickets);
parkingticketroot.post('/update', tickets_ctrl_1.default.updateparking_tickets);
parkingticketroot.post('/delete', tickets_ctrl_1.default.deleteparking_tickets);
parkingticketroot.post('/get-ticket-with-parking-details', tickets_ctrl_1.default.getticket_with_parking_details);
//# sourceMappingURL=tickets.router.js.map