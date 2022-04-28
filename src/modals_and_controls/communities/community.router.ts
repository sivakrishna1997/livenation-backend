import * as express from 'express';
const root = express.Router();
import communityCtrls from './community.ctrl';

root.post('/add', communityCtrls.addcommunity);
root.post('/get', communityCtrls.getcommunity);
root.post('/update', communityCtrls.updatecommunity);
root.post('/delete', communityCtrls.deletecommunity);

export default root;
