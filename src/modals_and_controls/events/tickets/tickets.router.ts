import * as express from 'express';
const ticketroot = express.Router();
const parkingticketroot = express.Router();
import ticketCtrl from './tickets.ctrl';

//tickets
ticketroot.post('/add', ticketCtrl.addticket);
ticketroot.post('/get', ticketCtrl.gettickets);
ticketroot.post('/update', ticketCtrl.updatetickets);
ticketroot.post('/delete', ticketCtrl.deletetickets);


// parking tickets
parkingticketroot.post('/add', ticketCtrl.addparking_tickets);
parkingticketroot.post('/get', ticketCtrl.getparking_tickets);
parkingticketroot.post('/update', ticketCtrl.updateparking_tickets);
parkingticketroot.post('/delete', ticketCtrl.deleteparking_tickets);

parkingticketroot.post('/get-ticket-with-parking-details', ticketCtrl.getticket_with_parking_details);


export { ticketroot, parkingticketroot };

