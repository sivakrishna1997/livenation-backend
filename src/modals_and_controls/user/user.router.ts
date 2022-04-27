import * as express from 'express';
import userCtrls from './user.ctrl';
const root = express.Router();

root.post('/register', userCtrls.adduser);
root.post('/login', userCtrls.userlogin);
root.post('/get', userCtrls.getuser);
root.get('/getall', userCtrls.getallusers);
root.post('/delete', userCtrls.deleteuser);
root.post('/update', userCtrls.updateuser);
root.post('/updatepassword', userCtrls.updatepassword);
root.post('/check-user-and-save', userCtrls.checkUserAndSave);


export default root;