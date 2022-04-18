import * as express from 'express';
const root = express.Router();
import ticketCtrl from './tickets.ctrl';

root.post('/add', ticketCtrl.addticket);
root.post('/addmultiple', ticketCtrl.addmultipletickets);
root.post('/get', ticketCtrl.gettickets);
root.post('/update', ticketCtrl.updatetickets);
root.post('/delete', ticketCtrl.deletetickets);

export default root;
