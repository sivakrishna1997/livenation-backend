import * as express from 'express';
const root = express.Router();
import event from './events.ctrl';

root.post('/add', event.addevent);
root.post('/get', event.getevents);
root.post('/update', event.updateevent);
root.post('/delete', event.deleteevent);

export default root;
