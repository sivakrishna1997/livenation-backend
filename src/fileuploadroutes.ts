import * as express from 'express';
const routes = express.Router();
const passport = require("passport")
const authenticate = passport.authenticate('jwt', { session: false });

import uploadCtrl from './service/cloudinary.service';

// import imagedetailscrtl from './app/images/imagecontroller';
// import imageCtrl from './app/images/images/images';
// import carousalcrtl from './app/images/carousal/carousalcontroller';

routes.use('/getimageurl', uploadCtrl.uploadandgeturl);

// routes.use('/image', uploadCtrl.uploadimage, imageCtrl.addimage);
// routes.use('/images', uploadCtrl.uploadimages, imageCtrl.addimage);

// adding images
// routes.use('/images/add', uploadCtrl.uploadimages, imagedetailscrtl.addimagedetails);
// routes.use('/images/delete', uploadCtrl.deleteimage, imagedetailscrtl.deleteimagepermanently);

// //adding carousal
// routes.use('/carousal/add', uploadCtrl.uploadimages, carousalcrtl.addcarousaldetails);
// routes.use('/carousal/delete', uploadCtrl.deleteimage, carousalcrtl.deletecarousalpermanently);


export default routes;