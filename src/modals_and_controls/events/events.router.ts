import * as express from 'express';
const root = express.Router();
import event from './events.ctrl';

root.post('/add', event.addevent);
root.post('/get', event.getevents);
root.post('/geteventbyid', event.geteventbyid);
root.post('/update', event.updateevent);
root.post('/delete', event.deleteevent);
root.post('/geteventsforyou', event.geteventsforyou);
root.post('/geteventsforcarousel', event.geteventsforcarousel);
root.post('/getfeaturedevents', event.getfeaturedevents);

export default root;
