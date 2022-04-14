import { genre } from './genre.schema';
import { Request, Response } from "express";
import { success, error } from '../../service/response.service';
import { ObjectId } from 'mongodb';



const addgenre = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        genre.findOne({ name: params.name }).then(
            async (udoc) => {
                if (udoc) {
                    error(req, res, 'Genre already exist!', null)
                } else {
                    params['cdate'] = Date.now();
                    params['udate'] = Date.now();

                    var inputdata = new genre(params)
                    inputdata.save().then(
                        (doc: any) => {
                            success(req, res, 'Genre added successfully!', doc);
                        }, (err: any) => {
                            error(req, res, 'Genre adding failed!', err);
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


const getgenre = (req: Request, res: Response) => {
    try {
        let params = req.body;
        var query: any = {};
        params.name ? query['name'] = params.name : null;
        params._id ? query['_id'] = new ObjectId(`${params._id}`) : null;
        genre.find(query).then(
            (doc: any) => {
                if (doc) {
                    success(req, res, "Genre Details!", doc);
                } else {
                    error(req, res, "Genre Doesn't Exists!", "");
                }
            }, err => {
                error(req, res, '', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}

const updategenre = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        genre.findOneAndUpdate(
            {
                _id: new ObjectId(`${params._id}`)
            },
            {
                $set: {
                    name: params.name
                }
            }
        ).then(
            (udoc: any) => {
                if (!udoc) {
                    error(req, res, "Genre doesn't exists!", null);
                } else {
                    success(req, res, "Genre updated successfully!", udoc);
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

const deletegenre = (req: Request, res: Response) => {
    try {
        let params = req.body;
        let query: any = { _id: new ObjectId(`${params._id}`) };
        genre.findOneAndDelete(query).then(
            (doc: any) => {
                if (!doc) {
                    error(req, res, "Genre doesn't exists!", "");
                } else {
                    success(req, res, "Genre deleted successfully!", {});
                }
            }, err => {
                error(req, res, '', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}

export default {
    addgenre,
    getgenre,
    updategenre,
    deletegenre,
};

