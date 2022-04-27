import * as express from 'express';
const root = express.Router();
import packageCtrl from './packages.ctrl';

root.post('/add', packageCtrl.addpackage);
root.post('/get', packageCtrl.getpackages);
root.post('/update', packageCtrl.updatepackage);
root.post('/delete', packageCtrl.deletepackage);

export default root;
