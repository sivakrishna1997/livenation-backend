import * as express from 'express';
const router = express.Router();

import userroutes from './modals_and_controls/user/user.router';
import artistroutes from './modals_and_controls/artist/artist.router';
import genreroutes from './modals_and_controls/genre/genre.router';
import { venueroot, stageroot } from './modals_and_controls/venue/venue.router';
import eventsroutes from './modals_and_controls/events/events.router';
import { ticketroot, parkingticketroot } from './modals_and_controls/events/tickets/tickets.router';
import packagesroutes from './modals_and_controls/events/packages/packages.router';
import communitiesroutes from './modals_and_controls/communities/community.router';
import parkingroutes from './modals_and_controls/parking/parking.router';
import paymentroutes from './modals_and_controls/payment/payment.router';
import plumaintenance from './modals_and_controls/plu-maintenance/plu.router';
import inventoryroutes from './modals_and_controls/inventory-management/inventory.router';

// const passport = require("passport")
// const authenticate = passport.authenticate('jwt', { session: false })

router.use('/user', userroutes);
router.use('/artist', artistroutes);
router.use('/genres', genreroutes);
router.use('/venues', venueroot);
router.use('/stages', stageroot);
router.use('/events', eventsroutes);
router.use('/tickets', ticketroot);
router.use('/parking-tickets', parkingticketroot);
router.use('/packages', packagesroutes);
router.use('/communities', communitiesroutes);
router.use('/parking', parkingroutes);
router.use('/payment', paymentroutes);
router.use('/plu-maintenance', plumaintenance);
router.use('/inventory', inventoryroutes);


// routes.use('/material', authenticate, materialrouts);



export default router;