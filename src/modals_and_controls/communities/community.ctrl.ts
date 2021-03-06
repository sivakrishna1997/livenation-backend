import { communities } from './community.schema';
import { Request, Response } from "express";
import { success, error } from '../../service/response.service';
import { ObjectId } from 'mongodb';
import { communityErrs } from '../../service/error-handler.service';



const addcommunity = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        params['cdate'] = Date.now();
        params['udate'] = Date.now();

        var inputdata = new communities(params)
        inputdata.save().then(
            (doc: any) => {
                success(req, res, 'Community added successfully!', doc);
            }, (err: any) => {
                error(req, res, communityErrs(err), null);
            }
        )
    } catch (err) {
        error(req, res, '', err)
    }
}


const getcommunity = (req: Request, res: Response) => {
    try {
        let params = req.body;
        var query: any = {};
        params.name ? query['name'] = params.name : null;
        params._id ? query['_id'] = new ObjectId(`${params._id}`) : null;
        communities.find(query).then(
            (doc: any) => {
                if (doc) {
                    success(req, res, "Community Details!", doc);
                } else {
                    error(req, res, "Community Doesn't Exists!", null);
                }
            }, err => {
                error(req, res, '', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}

const updatecommunity = async (req: Request, res: Response) => {
    try {
        let params = req.body;

        let setQuery: any = {};

        params.name ? setQuery['name'] = params.name : null;
        setQuery['udate'] = Date.now();

        communities.findOneAndUpdate(
            {
                _id: new ObjectId(`${params._id}`)
            },
            {
                $set: setQuery
            }
        ).then(
            (udoc: any) => {
                if (!udoc) {
                    error(req, res, "Community doesn't exists!", null);
                } else {
                    success(req, res, "Community updated successfully!", {});
                }
            }, err => {
                error(req, res, '', err);
            }
        )
    }
    catch (err) {
        error(req, res, '', err);
    }
}

const deletecommunity = (req: Request, res: Response) => {
    try {
        let params = req.body;
        let query: any = { _id: new ObjectId(`${params._id}`) };
        communities.findOneAndDelete(query).then(
            (doc: any) => {
                if (!doc) {
                    error(req, res, "Community doesn't exists!", "");
                } else {
                    success(req, res, "Community deleted successfully!", {});
                }
            }, err => {
                error(req, res, '', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}

export default {
    addcommunity,
    getcommunity,
    updatecommunity,
    deletecommunity
};

