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
const router = express.Router();
const user_router_1 = __importDefault(require("./modals_and_controls/user/user.router"));
const artist_router_1 = __importDefault(require("./modals_and_controls/artist/artist.router"));
const genre_router_1 = __importDefault(require("./modals_and_controls/genre/genre.router"));
const venue_router_1 = require("./modals_and_controls/venue/venue.router");
const events_router_1 = __importDefault(require("./modals_and_controls/events/events.router"));
const tickets_router_1 = require("./modals_and_controls/events/tickets/tickets.router");
const packages_router_1 = __importDefault(require("./modals_and_controls/events/packages/packages.router"));
const community_router_1 = __importDefault(require("./modals_and_controls/communities/community.router"));
const parking_router_1 = __importDefault(require("./modals_and_controls/parking/parking.router"));
const payment_router_1 = __importDefault(require("./modals_and_controls/payment/payment.router"));
const plu_router_1 = __importDefault(require("./modals_and_controls/plu-maintenance/plu.router"));
const inventory_router_1 = __importDefault(require("./modals_and_controls/inventory-management/inventory.router"));
// const passport = require("passport")
// const authenticate = passport.authenticate('jwt', { session: false })
router.use('/user', user_router_1.default);
router.use('/artist', artist_router_1.default);
router.use('/genres', genre_router_1.default);
router.use('/venues', venue_router_1.venueroot);
router.use('/stages', venue_router_1.stageroot);
router.use('/events', events_router_1.default);
router.use('/tickets', tickets_router_1.ticketroot);
router.use('/parking-tickets', tickets_router_1.parkingticketroot);
router.use('/packages', packages_router_1.default);
router.use('/communities', community_router_1.default);
router.use('/parking', parking_router_1.default);
router.use('/payment', payment_router_1.default);
router.use('/plu-maintenance', plu_router_1.default);
router.use('/inventory', inventory_router_1.default);
// routes.use('/material', authenticate, materialrouts);
exports.default = router;
//# sourceMappingURL=routes.js.map