import * as express from 'express';
const root = express.Router();
import parkingCtrl from './parking.ctrl';


root.post('/add', parkingCtrl.addparking);
root.post('/get', parkingCtrl.getparking);
root.post('/update', parkingCtrl.updateparking);
root.post('/delete', parkingCtrl.deleteparking);

export default root;
