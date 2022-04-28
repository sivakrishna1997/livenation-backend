"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const routes = express.Router();
const passport = require("passport");
const authenticate = passport.authenticate('jwt', { session: false });
const cloudinary_service_1 = __importDefault(require("./service/cloudinary.service"));
// import imagedetailscrtl from './app/images/imagecontroller';
// import imageCtrl from './app/images/images/images';
// import carousalcrtl from './app/images/carousal/carousalcontroller';
routes.use('/getimageurl', cloudinary_service_1.default.uploadandgeturl);
// routes.use('/image', uploadCtrl.uploadimage, imageCtrl.addimage);
// routes.use('/images', uploadCtrl.uploadimages, imageCtrl.addimage);
// adding images
// routes.use('/images/add', uploadCtrl.uploadimages, imagedetailscrtl.addimagedetails);
// routes.use('/images/delete', uploadCtrl.deleteimage, imagedetailscrtl.deleteimagepermanently);
// //adding carousal
// routes.use('/carousal/add', uploadCtrl.uploadimages, carousalcrtl.addcarousaldetails);
// routes.use('/carousal/delete', uploadCtrl.deleteimage, carousalcrtl.deletecarousalpermanently);
exports.default = routes;
//# sourceMappingURL=fileuploadroutes.js.map