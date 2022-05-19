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
const express = __importStar(require("express"));
const root = express.Router();
const events_ctrl_1 = __importDefault(require("./events.ctrl"));
root.post('/add', events_ctrl_1.default.addevent);
root.post('/get', events_ctrl_1.default.getevents);
root.post('/geteventbyid', events_ctrl_1.default.geteventbyid);
root.post('/update', events_ctrl_1.default.updateevent);
root.post('/delete', events_ctrl_1.default.deleteevent);
root.post('/geteventsforyou', events_ctrl_1.default.geteventsforyou);
root.post('/geteventsforcarousel', events_ctrl_1.default.geteventsforcarousel);
root.post('/getfeaturedevents', events_ctrl_1.default.getfeaturedevents);
exports.default = root;
//# sourceMappingURL=events.router.js.map