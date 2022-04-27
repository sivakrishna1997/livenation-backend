import * as express from 'express';
const root = express.Router();
import artistCtrls from './artist.ctrl';

root.post('/add', artistCtrls.addartist);
root.post('/get', artistCtrls.getartist);
root.post('/update', artistCtrls.updateartist);
root.post('/delete', artistCtrls.deleteartist);
root.post('/getartist_with_eventcount', artistCtrls.getartist_with_eventcount);

export default root;
