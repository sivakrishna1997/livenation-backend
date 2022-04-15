// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
// import { user } from '../app/user/userschema'

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


import * as dotenv from "dotenv";
dotenv.config();
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
import { user } from '../modals_and_controls/user/user.schema'


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWTSECRET,
}

const strategy = new JwtStrategy(options, (payload: any, done: any) => {
    user.findOne({ email: payload.email })
        .then((user) => {
            if (user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        }).catch(err => { return done(err, null) })
})

export default (passport: any) => {
    passport.use(strategy);
}

