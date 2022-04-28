import { packages } from './packages.schema';
import { Request, Response } from "express";
import { success, error } from '../../service/response.service';
import { ObjectId } from 'mongodb';



const addpackage = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        packages.findOne({ title: params.title }).then(
            async (udoc) => {
                if (udoc) {
                    error(req, res, 'Pacakge already exist!', null)
                } else {
                    params['cdate'] = Date.now();
                    params['udate'] = Date.now();

                    var inputdata = new packages(params)
                    inputdata.save().then(
                        (doc: any) => {
                            success(req, res, 'Package added successfully!', doc);
                        }, (err: any) => {
                            error(req, res, 'Package adding failed!', err);
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


const getpackages = (req: Request, res: Response) => {
    try {
        let params = req.body;
        var query: any = {};
        params.title ? query['title'] = params.title : null;
        params._id ? query['_id'] = new ObjectId(`${params._id}`) : null;


        packages.find(query).then(
            (doc: any) => {
                if (doc) {
                    success(req, res, "Package details!", doc);
                } else {
                    error(req, res, "Package doesn't exists!", "");
                }
            }, err => {
                error(req, res, '', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}


const updatepackage = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        let setQuery: any = {};

        params.title ? setQuery['title'] = params.title : null;
        params.price ? setQuery['price'] = params.price : null;
        params.equivalent_points ? setQuery['equivalent_points'] = params.equivalent_points : null;
        params.available_quantity ? setQuery['available_quantity'] = params.available_quantity : null;
        params.inclusions ? setQuery['inclusions'] = params.inclusions : null;

        setQuery['udate'] = Date.now();

        packages.findOneAndUpdate(
            {
                _id: new ObjectId(`${params._id}`)
            },
            {
                $set: setQuery
            }
        ).then(
            (udoc: any) => {
                if (!udoc) {
                    error(req, res, "Package doesn't exists!", null);
                } else {
                    success(req, res, "Package updated successfully!", {});
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

const deletepackage = (req: Request, res: Response) => {
    try {
        let params = req.body;
        let query: any = { _id: new ObjectId(`${params._id}`) };
        packages.findOneAndDelete(query).then(
            (doc: any) => {
                if (!doc) {
                    error(req, res, "Package doesn't exists!", "");
                } else {
                    success(req, res, "Package deleted successfully!", {});
                }
            }, err => {
                error(req, res, '', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}

export default {
    addpackage,
    getpackages,
    updatepackage,
    deletepackage,
};

