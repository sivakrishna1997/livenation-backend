"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = require("./user.schema");
const response_service_1 = require("../../service/response.service");
// const ObjectId = require('mongodb').ObjectId;
const mongodb_1 = require("mongodb");
const userformatter_1 = require("./userformatter");
const common_service_1 = __importDefault(require("../../service/common.service"));
const error_handler_service_1 = require("../../service/error-handler.service");
const sendUserWithToken = (req, res, doc, message) => __awaiter(void 0, void 0, void 0, function* () {
    let payload = {
        email: doc.email,
        id: doc._id,
    };
    let responseObj = {
        token: yield common_service_1.default.newToken(payload),
        user: (0, userformatter_1.userformatter)(doc)
    };
    (0, response_service_1.success)(req, res, message, responseObj);
});
const adduser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        params['cdate'] = Date.now();
        params['udate'] = Date.now();
        params['password'] = yield common_service_1.default.encriptPassword(req.body.password);
        var inputdata = new user_schema_1.user(params);
        inputdata.save().then((doc) => {
            (0, response_service_1.success)(req, res, 'Registered successfully!', (0, userformatter_1.userformatter)(doc));
        }, (err) => __awaiter(void 0, void 0, void 0, function* () {
            let err_msg = yield (0, error_handler_service_1.userErrs)(err);
            (0, response_service_1.error)(req, res, err_msg, null);
        }));
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
    // try {
    //     let params = req.body;
    //     user.findOne({ email: params.email }).then(
    //         (edoc) => {
    //             if (edoc) {
    //                 error(req, res, 'Email already exist!', null);
    //             } else {
    //                 user.findOne({ username: params.username }).then(
    //                     async (udoc) => {
    //                         if (udoc) {
    //                             error(req, res, 'Username already exist!', null)
    //                         } else {
    //                             params['cdate'] = Date.now();
    //                             params['udate'] = Date.now();
    //                             params['password'] = await commonService.encriptPassword(req.body.password);
    //                             var inputdata = new user(params)
    //                             inputdata.save().then(
    //                                 (doc: any) => {
    //                                     success(req, res, 'Registered Successfully!', userformatter(doc));
    //                                 }, (err: any) => {
    //                                     error(req, res, 'Registration Failed!', err);
    //                                 }
    //                             )
    //                         }
    //                     }, err => {
    //                         error(req, res, 'Registration Failed!', err)
    //                     }
    //                 )
    //             }
    //         }, err => {
    //             error(req, res, 'Registration Failed!', err)
    //         }
    //     )
    // } catch (err) {
    //     error(req, res, 'Registration Failed!', err)
    // }
});
const checkUserAndSave = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        user_schema_1.user.findOne({ email: params.email }).then((edoc) => __awaiter(void 0, void 0, void 0, function* () {
            if (edoc) {
                sendUserWithToken(req, res, edoc, 'User Exist!');
            }
            else {
                params['cdate'] = Date.now();
                params['udate'] = Date.now();
                params['password'] = yield common_service_1.default.encriptPassword(req.body.password);
                var inputdata = new user_schema_1.user(params);
                inputdata.save().then((doc) => {
                    sendUserWithToken(req, res, doc, 'User Added Successfully!');
                }, (err) => {
                    (0, response_service_1.error)(req, res, 'User Adding Failed!', err);
                });
            }
        }), err => {
            (0, response_service_1.error)(req, res, 'User Adding Failed!', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, 'User Adding Failed!', err);
    }
});
const userlogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        var query = {
            $or: [{
                    username: params.userId
                }, {
                    email: params.userId
                }]
        };
        user_schema_1.user.findOne(query).then((doc) => __awaiter(void 0, void 0, void 0, function* () {
            if (doc) {
                let passwordMatch = yield common_service_1.default.comparePassword(req.body.password, doc.password);
                if (!passwordMatch) {
                    (0, response_service_1.error)(req, res, "Password Doesn't Match!", "");
                    return null;
                }
                sendUserWithToken(req, res, doc, "Login Successfully");
            }
            else {
                (0, response_service_1.error)(req, res, "User Doesn't Exists", "");
            }
        }), err => {
            (0, response_service_1.error)(req, res, 'Login Failed!', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const getuser = (req, res) => {
    try {
        let params = req.body;
        var query = {};
        params.email ? query['email'] = params.email : null;
        params.username ? query['username'] = params.username : null;
        params.mobile ? query['mobile'] = params.mobile : null;
        params._id ? query['_id'] = new mongodb_1.ObjectId(`${params._id}`) : null;
        params.role ? query['role'] = params.role : null;
        user_schema_1.user.findOne(query, { password: 0 }).then((doc) => {
            if (doc) {
                (0, response_service_1.success)(req, res, "User Details", (0, userformatter_1.userformatter)(doc));
            }
            else {
                (0, response_service_1.error)(req, res, "User Doesn't Exists!", "");
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
const getallusers = (req, res) => {
    try {
        user_schema_1.user.find({}, { password: 0 }).then((doc) => {
            if (doc) {
                (0, response_service_1.success)(req, res, "User Details", doc);
            }
            else {
                (0, response_service_1.error)(req, res, "Users Doesn't Exists!", "");
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
const deleteuser = (req, res) => {
    try {
        let params = req.body;
        let query = {
            _id: new mongodb_1.ObjectId(`${params._id}`)
        };
        user_schema_1.user.findOneAndDelete(query).then((doc) => {
            if (!doc) {
                (0, response_service_1.error)(req, res, "User dose't exist!", "");
            }
            else {
                (0, response_service_1.success)(req, res, "User deleted successfully!", {});
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
const updatepassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        let query = { _id: new mongodb_1.ObjectId(`${params._id}`) };
        user_schema_1.user.findOne(query).then((doc) => __awaiter(void 0, void 0, void 0, function* () {
            if (doc) {
                let passwordMatch = yield common_service_1.default.comparePassword(req.body.password, doc.password);
                if (!passwordMatch) {
                    (0, response_service_1.error)(req, res, "Password Doesn't Match!", "");
                    return null;
                }
                params['password'] = yield common_service_1.default.encriptPassword(req.body.newPassword);
                user_schema_1.user.findOneAndUpdate(query, { $set: { password: params.password } })
                    .then((udoc) => {
                    if (udoc.n == 0) {
                        (0, response_service_1.error)(req, res, "Password updating failed!", "");
                    }
                    else {
                        (0, response_service_1.success)(req, res, "Password updated successfully!", {});
                    }
                }, err => {
                    (0, response_service_1.error)(req, res, '', err);
                });
            }
            else {
                (0, response_service_1.error)(req, res, "Users Doesn't Exists!", "");
            }
        }), err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const updateuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        let query = { _id: new mongodb_1.ObjectId(`${params._id}`) };
        let setQuery = {};
        params.firstname ? setQuery['firstname'] = params.firstname : null;
        params.lastname ? setQuery['lastname'] = params.lastname : null;
        params.email ? setQuery['email'] = params.email : null;
        params.username ? setQuery['username'] = params.username : null;
        params.mobile ? setQuery['mobile'] = params.mobile : null;
        params.gender ? setQuery['gender'] = params.gender : null;
        params.dob ? setQuery['dob'] = params.dob : null;
        params.country ? setQuery['country'] = params.country : null;
        params.provider ? setQuery['provider'] = params.provider : null;
        params.uid ? setQuery['uid'] = params.uid : null;
        params.photo_url ? setQuery['photo_url'] = params.photo_url : null;
        params.preferred_genres ? setQuery['preferred_genres'] = params.preferred_genres : null;
        params.subscription ? setQuery['subscription'] = params.subscription : null;
        params.terms_conditions == true ? setQuery['terms_conditions'] = true : null;
        params.terms_conditions == false ? setQuery['terms_conditions'] = false : null;
        params.email_verified == true ? setQuery['email_verified'] = true : null;
        params.email_verified == false ? setQuery['email_verified'] = false : null;
        setQuery['udate'] = Date.now();
        user_schema_1.user.findOneAndUpdate(query, { $set: setQuery }).then((doc) => __awaiter(void 0, void 0, void 0, function* () {
            if (!doc) {
                (0, response_service_1.error)(req, res, "User updating failed!", "");
            }
            else {
                user_schema_1.user.findOne(query).then((udoc) => {
                    (0, response_service_1.success)(req, res, "User updated successfully!", (0, userformatter_1.userformatter)(udoc));
                }, err => {
                    (0, response_service_1.error)(req, res, '', err);
                });
            }
        }), err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
exports.default = {
    adduser,
    userlogin,
    getuser,
    getallusers,
    deleteuser,
    updateuser,
    updatepassword,
    checkUserAndSave
};
//# sourceMappingURL=user.ctrl.js.map