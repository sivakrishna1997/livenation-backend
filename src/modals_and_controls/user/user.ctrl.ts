import { user } from './user.schema';
import { success, error } from '../../service/response.service';
// const ObjectId = require('mongodb').ObjectId;
import { ObjectId } from 'mongodb';
import { userformatter } from './userformatter';
import commonService from '../../service/common.service';
import { Request, Response } from "express";
import { userErrs } from '../../service/error-handler.service';



const sendUserWithToken = async (req: Request, res: Response, doc: any, message: string) => {
    let payload = {
        email: doc.email,
        id: doc._id,
    };
    let responseObj = {
        token: await commonService.newToken(payload),
        user: userformatter(doc)
    }
    success(req, res, message, responseObj);
}


const adduser = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        params['cdate'] = Date.now();
        params['udate'] = Date.now();
        params['password'] = await commonService.encriptPassword(req.body.password);
        var inputdata = new user(params)
        inputdata.save().then(
            (doc: any) => {
                success(req, res, 'Registered successfully!', userformatter(doc));
            }, async (err: any) => {
                let err_msg = await userErrs(err);
                error(req, res, err_msg, null);
            }
        )
    } catch (err) {
        error(req, res, '', err)
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
}

const checkUserAndSave = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        user.findOne({ email: params.email }).then(
            async (edoc) => {
                if (edoc) {
                    sendUserWithToken(req, res, edoc, 'User Exist!');
                } else {
                    params['cdate'] = Date.now();
                    params['udate'] = Date.now();
                    params['password'] = await commonService.encriptPassword(req.body.password);
                    var inputdata = new user(params)
                    inputdata.save().then(
                        (doc: any) => {
                            sendUserWithToken(req, res, doc, 'User Added Successfully!');
                        }, (err: any) => {
                            error(req, res, 'User Adding Failed!', err);
                        }
                    )
                }
            }, err => {
                error(req, res, 'User Adding Failed!', err)
            }
        )
    } catch (err) {
        error(req, res, 'User Adding Failed!', err)
    }
}

const userlogin = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        var query = {
            $or: [{
                username: params.userId
            }, {
                email: params.userId
            }]
        }
        user.findOne(query).then(
            async (doc: any) => {
                if (doc) {
                    let passwordMatch = await commonService.comparePassword(req.body.password, doc.password);
                    if (!passwordMatch) {
                        error(req, res, "Password Doesn't Match!", "");
                        return null;
                    }
                    sendUserWithToken(req, res, doc, "Login Successfully");
                } else {
                    error(req, res, "User Doesn't Exists", "");
                }
            }, err => {
                error(req, res, 'Login Failed!', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}



const getuser = (req: Request, res: Response) => {
    try {
        let params = req.body;
        var query: any = {}
        params.email ? query['email'] = params.email : null;
        params.username ? query['username'] = params.username : null;
        params.mobile ? query['mobile'] = params.mobile : null;
        params._id ? query['_id'] = new ObjectId(`${params._id}`) : null;
        params.role ? query['role'] = params.role : null;
        user.findOne(query, { password: 0 }).then(
            (doc: any) => {
                if (doc) {
                    success(req, res, "User Details", userformatter(doc));
                } else {
                    error(req, res, "User Doesn't Exists!", "");
                }
            }, err => {
                error(req, res, '', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}

const getallusers = (req: Request, res: Response) => {
    try {
        user.find({}, { password: 0 }).then(
            (doc: any) => {
                if (doc) {
                    success(req, res, "User Details", doc);
                } else {
                    error(req, res, "Users Doesn't Exists!", "");
                }
            }, err => {
                error(req, res, '', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}


const deleteuser = (req: Request, res: Response) => {
    try {
        let params = req.body;
        let query: any = {
            _id: new ObjectId(`${params._id}`)
        };
        user.findOneAndDelete(query).then(
            (doc: any) => {
                if (!doc) {
                    error(req, res, "User dose't exist!", "");
                } else {
                    success(req, res, "User deleted successfully!", {});
                }
            }, err => {
                error(req, res, '', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}


const updatepassword = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        let query = { _id: new ObjectId(`${params._id}`) }
        user.findOne(query).then(
            async (doc: any) => {
                if (doc) {
                    let passwordMatch = await commonService.comparePassword(req.body.password, doc.password);
                    if (!passwordMatch) {
                        error(req, res, "Password Doesn't Match!", "");
                        return null;
                    }
                    params['password'] = await commonService.encriptPassword(req.body.newPassword);
                    user.findOneAndUpdate(query, { $set: { password: params.password } })
                        .then(
                            (udoc: any) => {
                                if (udoc.n == 0) {
                                    error(req, res, "Password updating failed!", "");
                                } else {
                                    success(req, res, "Password updated successfully!", {});
                                }
                            }, err => {
                                error(req, res, '', err);
                            }
                        )
                } else {
                    error(req, res, "Users Doesn't Exists!", "");
                }
            }, err => {
                error(req, res, '', err)
            })

    } catch (err) {
        error(req, res, '', err)
    }
}



const updateuser = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        let query = { _id: new ObjectId(`${params._id}`) }
        let setQuery: any = {};

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

        user.findOneAndUpdate(query, { $set: setQuery }).then(
            async (doc: any) => {
                if (!doc) {
                    error(req, res, "User updating failed!", "");
                } else {
                    user.findOne(query).then(
                        (udoc: any) => {
                            success(req, res, "User updated successfully!", userformatter(udoc));
                        }, err => {
                            error(req, res, '', err)
                        })
                }
            }, err => {
                error(req, res, '', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}


export default {
    adduser,
    userlogin,
    getuser,
    getallusers,
    deleteuser,
    updateuser,
    updatepassword,
    checkUserAndSave
};

