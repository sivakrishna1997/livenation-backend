import { artist } from './artist.schema';
import { Request, Response } from "express";
import { success, error } from '../../service/response.service';
import { ObjectId } from 'mongodb';



const addartist = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        artist.findOne({ name: params.name }).then(
            async (udoc) => {
                if (udoc) {
                    error(req, res, 'Artist already exist!', null)
                } else {
                    params['cdate'] = Date.now();
                    params['udate'] = Date.now();

                    var inputdata = new artist(params)
                    inputdata.save().then(
                        (doc: any) => {
                            success(req, res, 'Artist added successfully!', doc);
                        }, (err: any) => {
                            error(req, res, 'Artist adding failed!', err);
                        }
                    )
                }
            }, err => {
                error(req, res, '', err)
            }
        )
    } catch (err) {
        error(req, res, '', err)
    }
}


const getartist = (req: Request, res: Response) => {
    try {
        let params = req.body;
        var query: any = {};
        params.name ? query['name'] = params.name : null;
        params._id ? query['_id'] = new ObjectId(`${params._id}`) : null;
        artist.find(query).then(
            (doc: any) => {
                if (doc) {
                    success(req, res, "Artist details!", doc);
                } else {
                    error(req, res, "Artist doesn't exists!", "");
                }
            }, err => {
                error(req, res, '', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}

const updateartist = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        let setQuery: any = {};

        params.name ? setQuery['name'] = params.name : null;
        params.description ? setQuery['description'] = params.description : null;
        params.active ? setQuery['active'] = true : setQuery['active'] = false;
        setQuery['udate'] = Date.now();

        artist.findOneAndUpdate(
            {
                _id: new ObjectId(`${params._id}`)
            },
            {
                $set: setQuery
            }
        ).then(
            (udoc: any) => {
                if (!udoc) {
                    error(req, res, "Artist doesn't exists!", null);
                } else {
                    success(req, res, "Artist updated successfully!", udoc);
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

const deleteartist = (req: Request, res: Response) => {
    try {
        let params = req.body;
        let query: any = { _id: new ObjectId(`${params._id}`) };
        artist.findOneAndDelete(query).then(
            (doc: any) => {
                if (!doc) {
                    error(req, res, "Artist doesn't exists!", "");
                } else {
                    success(req, res, "Artist deleted successfully!", {});
                }
            }, err => {
                error(req, res, '', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}

export default {
    addartist,
    getartist,
    updateartist,
    deleteartist,
};

