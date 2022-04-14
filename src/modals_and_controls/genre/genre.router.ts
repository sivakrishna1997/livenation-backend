import * as express from 'express';
const root = express.Router();
import genreCtrls from './genre.ctrl';

root.post('/add', genreCtrls.addgenre);
root.post('/get', genreCtrls.getgenre);
root.post('/update', genreCtrls.updategenre);
root.post('/delete', genreCtrls.deletegenre);

export default root;
