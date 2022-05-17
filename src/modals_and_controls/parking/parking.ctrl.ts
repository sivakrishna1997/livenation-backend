import { parking } from './parking.schema';
import { Request, Response } from "express";
import { success, error } from '../../service/response.service';
import { ObjectId } from 'mongodb';


const addparking = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        params['cdate'] = Date.now();
        params['udate'] = Date.now();

        var inputdata = new parking(params)
        inputdata.save().then(
            (doc: any) => {
                success(req, res, 'Parking slots added successfully!', doc);
            }, (err: any) => {
                error(req, res, 'Parking slots adding failed!', err);
            }
        )

    } catch (err) {
        error(req, res, '', err)
    }
}

const getparking = (req: Request, res: Response) => {
    try {
        let params = req.body;
        var query: any = {};
        params._id ? query['_id'] = new ObjectId(`${params._id}`) : null;
        parking.find(query).then(
            (doc: any) => {
                if (doc) {
                    success(req, res, "Parking details!", doc);
                } else {
                    error(req, res, "Parking slots Doesn't Exists!", "");
                }
            }, err => {
                error(req, res, '', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}

const updateparking = async (req: Request, res: Response) => {
    try {
        let params = req.body;

        let basedOn: any = {};
        params._id ? basedOn['_id'] = new ObjectId(`${params._id}`) : null;

        let setQuery: any = {};
        params.name ? setQuery['name'] = params.name : null;
        params.image ? setQuery['image'] = params.image : null;
        params.location ? setQuery['location'] = params.location : null;
        params.parking_slot_for_packages ? setQuery['parking_slot_for_packages'] = params.parking_slot_for_packages : null;
        params.vallet_parking_slots ? setQuery['vallet_parking_slots'] = params.vallet_parking_slots : null;
        params.vip_parking_slots ? setQuery['vip_parking_slots'] = params.vip_parking_slots : null;
        params.description ? setQuery['description'] = params.description : null;

        parking.findOneAndUpdate(basedOn, { $set: setQuery }).then(
            (udoc: any) => {
                if (!udoc) {
                    error(req, res, "Parking slots doesn't exists!", null);
                } else {
                    success(req, res, "Parking slots updated successfully!", {});
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

const deleteparking = (req: Request, res: Response) => {
    try {
        let params = req.body;

        let query: any = {
            "_id": new ObjectId(`${params._id}`)
        };
        parking.findOneAndDelete(query).then(
            (doc: any) => {
                if (!doc) {
                    error(req, res, "Parking slots doesn't exists!", "");
                } else {
                    success(req, res, "Parking slots deleted successfully!", {});
                }
            }, err => {
                error(req, res, '', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}


export default {
    addparking,
    getparking,
    updateparking,
    deleteparking,
};

