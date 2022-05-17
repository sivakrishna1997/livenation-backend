import * as express from 'express';
const venueroot = express.Router();
const stageroot = express.Router();
import venueAndStagesCtrls from './venue.ctrl';


//venues
venueroot.post('/add', venueAndStagesCtrls.addvenue);
venueroot.post('/get', venueAndStagesCtrls.getvenues);
venueroot.post('/update', venueAndStagesCtrls.updatevenues);
venueroot.post('/delete', venueAndStagesCtrls.deletevenue);


//stages
stageroot.post('/add', venueAndStagesCtrls.addstages);
stageroot.post('/get', venueAndStagesCtrls.getstages);
stageroot.post('/update', venueAndStagesCtrls.updatestages);
stageroot.post('/delete', venueAndStagesCtrls.deletestages);



export { venueroot, stageroot };
