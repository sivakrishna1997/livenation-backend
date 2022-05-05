import * as express from 'express';
const root = express.Router();
import paymentCtrl from './payment.ctrl';

root.post('/pay', paymentCtrl.pay);

export default root;
