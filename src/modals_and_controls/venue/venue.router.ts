import * as express from 'express';
const venueroot = express.Router();
const stageroot = express.Router();
import venueAndStagesCtrls from './venue.ctrl';


//venues
venueroot.post('/add', venueAndStagesCtrls.addvenue);
venueroot.post('/get', venueAndStagesCtrls.getvenues);
venueroot.post('/update', venueAndStagesCtrls.updatevenues);
venueroot.post('/delete', venueAndStagesCtrls.deletevenue);

//venue stages
venueroot.post('/add/stage', venueAndStagesCtrls.addvenuestages);
venueroot.post('/delete/stage', venueAndStagesCtrls.deletevenuestages);

//venue seats
venueroot.post('/add/seat', venueAndStagesCtrls.addvenueseats);
venueroot.post('/delete/seat', venueAndStagesCtrls.deletevenueseats);


//stages
stageroot.post('/add', venueAndStagesCtrls.addstages);
stageroot.post('/get', venueAndStagesCtrls.getstages);
stageroot.post('/update', venueAndStagesCtrls.updatestages);
stageroot.post('/delete', venueAndStagesCtrls.deletestages);



export { venueroot, stageroot };
