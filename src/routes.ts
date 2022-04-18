import * as express from 'express';
const router = express.Router();

import userroutes from './modals_and_controls/user/user.router';
import artistroutes from './modals_and_controls/artist/artist.router';
import genreroutes from './modals_and_controls/genre/genre.router';
import { venueroot, stageroot } from './modals_and_controls/venue/venue.router';
import eventsroutes from './modals_and_controls/events/events.router';
import ticketsroutes from './modals_and_controls/tickets/tickets.router';

// const passport = require("passport")
// const authenticate = passport.authenticate('jwt', { session: false })

router.use('/user', userroutes);
router.use('/artist', artistroutes);
router.use('/genres', genreroutes);
router.use('/venues', venueroot);
router.use('/stages', stageroot);
router.use('/events', eventsroutes);
router.use('/tickets', ticketsroutes);


// routes.use('/material', authenticate, materialrouts);



export default router;