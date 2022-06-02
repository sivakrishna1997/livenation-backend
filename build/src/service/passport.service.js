"use strict";
// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
// import { user } from '../app/user/userschema'
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
Object.defineProperty(exports, "__esModule", { value: true });
// const options = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: process.env.JWTSECRET,
// }
// const strategy = new JwtStrategy(options, (payload: any, done: any) => {
//     user.findOne({ email: payload.email })
//         .then((user) => {
//             if (user) {
//                 return done(null, user)
//             } else {
//                 return done(null, false)
//             }
//         }).catch(err => { return done(err, null) })
// })
// export default (passport: any) => {
//     passport.use(strategy);
// }
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const user_schema_1 = require("../modals_and_controls/user/user.schema");
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWTSECRET,
};
const strategy = new JwtStrategy(options, (payload, done) => {
    user_schema_1.user.findOne({ email: payload.email })
        .then((user) => {
        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    }).catch(err => { return done(err, null); });
});
exports.default = (passport) => {
    passport.use(strategy);
};
//# sourceMappingURL=passport.service.js.map