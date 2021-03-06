import { tickets, parking_tickets } from './tickets.schema';
import { packages } from '../packages/packages.schema';

import { Request, Response } from "express";
import { success, error } from '../../../service/response.service';
import { ObjectId } from 'mongodb';



const addticket = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        params['cdate'] = Date.now();
        params['udate'] = Date.now();

        var inputdata = new tickets(params)
        inputdata.save().then(
            (doc: any) => {
                success(req, res, 'Ticket added successfully!', doc);
            }, (err: any) => {
                error(req, res, 'Ticket adding failed!', err);
            }
        )

    } catch (err) {
        error(req, res, '', err)
    }
}


const gettickets = (req: Request, res: Response) => {
    try {
        let params = req.body;
        var query: any = {};

        params._id ? query['_id'] = new ObjectId(`${params._id}`) : null;
        params.concert ? query['concert'] = new ObjectId(`${params.concert}`) : null;
        params.venue ? query['venue'] = new ObjectId(`${params.venue}`) : null;

        params.event_date ? query['event_date'] = params.event_date : null;
        params.stage_setup ? query['stage_setup'] = params.stage_setup : null;

        params.between_dates ? query['event_date'] = { $gte: new Date(params.between_dates.start_date), $lt: new Date(params.between_dates.end_date) } : null;

        params.event_date_gt ? query['event_date'] = { $gte: new Date(params.event_date_gt) } : null;

        let removeQuery: any = {};
        params.remove_areas ? removeQuery['areas'] = 0 : null;
        params.remove_rows ? removeQuery['areas.rows'] = 0 : null;

        let ticketsWithDynamicPopulate = tickets.find(query, removeQuery);

        params.populate_concert ? ticketsWithDynamicPopulate.populate('concert') : null;
        params.populate_venue ? ticketsWithDynamicPopulate.populate('venue') : null;

        ticketsWithDynamicPopulate.then(
            (doc: any) => {
                if (doc) {
                    success(req, res, "Ticket Details!", doc);
                } else {
                    error(req, res, "Ticket Doesn't Exists!", "");
                }
            }, err => {
                error(req, res, '', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}



const updatetickets = async (req: Request, res: Response) => {
    try {
        let params = req.body;

        let basedOn: any = {};
        params._id ? basedOn['_id'] = new ObjectId(`${params._id}`) : null;

        params.concert ? basedOn['concert'] = new ObjectId(`${params.concert}`) : null;
        params.venue ? basedOn['venue'] = new ObjectId(`${params.venue}`) : null;
        params.stage_setup ? basedOn['stage_setup'] = params.stage_setup : null;

        params.area_id ? basedOn['areas'] = { $elemMatch: { _id: new ObjectId(`${params.area_id}`) } } : null;

        let setQuery: any = {};
        params.event_date ? setQuery['event_date'] = params.event_date : null;
        params.start_time ? setQuery['start_time'] = params.start_time : null;
        params.end_time ? setQuery['end_time'] = params.end_time : null;
        params.areas ? setQuery['areas'] = params.areas : null;

        params.price ? setQuery["areas.$.price"] = params.price : null;
        params.price_type ? setQuery["areas.$.price_type"] = params.price_type : null;
        params.points ? setQuery["areas.$.points"] = params.points : null;


        tickets.findOneAndUpdate(basedOn, { $set: setQuery }).then(
            (udoc: any) => {
                if (!udoc) {
                    error(req, res, "Tickets doesn't exists!", null);
                } else {
                    success(req, res, "Tickets updated successfully!", {});
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



const deletetickets = (req: Request, res: Response) => {
    try {
        let params = req.body;

        Promise.all([
            tickets.deleteMany({ _id: new ObjectId(`${params._id}`) }),
            parking_tickets.deleteMany({ ticket_id: params._id }),
            packages.deleteMany({ ticket_id: params._id })
        ]).then(
            (doc: any) => {
                if (!doc) {
                    error(req, res, "Concert doesn't exists!", "");
                } else {
                    success(req, res, "Concert deleted successfully!", doc);
                }
            }, err => {
                error(req, res, '', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}



//////////////// Parking Tickets Start/////////////////////

const addparking_tickets = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        parking_tickets.findOne({ ticket: new ObjectId(`${params.ticket}`), parking: new ObjectId(`${params.parking}`) }).then(
            async (udoc) => {
                if (udoc) {
                    error(req, res, 'Parking already exist!', null)
                } else {
                    params['cdate'] = Date.now();
                    params['udate'] = Date.now();

                    var inputdata = new parking_tickets(params)
                    inputdata.save().then(
                        (doc: any) => {
                            success(req, res, 'Parking added successfully!', doc);
                        }, (err: any) => {
                            error(req, res, 'Parking adding failed!', err);
                        }
                    )
                }
            }, err => {
                error(req, res, '', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}


const getparking_tickets = (req: Request, res: Response) => {
    try {
        let params = req.body;
        var query: any = {};

        params._id ? query['_id'] = new ObjectId(`${params._id}`) : null;
        params.ticket ? query['ticket'] = new ObjectId(`${params.ticket}`) : null;
        params.parking ? query['parking'] = new ObjectId(`${params.parking}`) : null;
        params.parking_type ? query['parking_type'] = params.parking_type : null;


        let removeQuery: any = {};
        params.remove_parking_seats ? removeQuery['parking_seats'] = 0 : null;

        parking_tickets.find(query, removeQuery)
            .populate('parking')
            .then(
                (doc: any) => {
                    if (doc) {
                        success(req, res, "Parking Details!", doc);
                    } else {
                        error(req, res, "Parking Doesn't Exists!", "");
                    }
                }, err => {
                    error(req, res, '', err)
                })
    } catch (err) {
        error(req, res, '', err)
    }
}

const updateparking_tickets = async (req: Request, res: Response) => {
    try {
        let params = req.body;

        let basedOn: any = {};
        params._id ? basedOn['_id'] = new ObjectId(`${params._id}`) : null;

        let setQuery: any = {};
        params.price ? setQuery['price'] = params.price : null;
        params.price_type ? setQuery['price_type'] = params.price_type : null;
        params.distance ? setQuery['distance'] = params.distance : null;
        params.parking ? setQuery['parking'] = new ObjectId(`${params.parking}`) : null;
        params.parking_type ? setQuery['parking_type'] = params.parking_type : null;
        params.parking_seats ? setQuery['parking_seats'] = params.parking_seats : null;

        parking_tickets.findOneAndUpdate(basedOn, { $set: setQuery }).then(
            (udoc: any) => {
                if (!udoc) {
                    error(req, res, "Parking doesn't exists!", null);
                } else {
                    success(req, res, "Parking updated successfully!", {});
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

const deleteparking_tickets = (req: Request, res: Response) => {
    try {
        let params = req.body;

        let query: any = {
            "_id": new ObjectId(`${params._id}`)
        };
        parking_tickets.findOneAndDelete(query).then(
            (doc: any) => {
                if (!doc) {
                    error(req, res, "Parking doesn't exists!", "");
                } else {
                    success(req, res, "Parking deleted successfully!", {});
                }
            }, err => {
                error(req, res, '', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}

const getticket_with_parking_details = (req: Request, res: Response) => {
    try {
        let params = req.body;

        let parking_tickets_with_dynamic_populate = parking_tickets.find({ ticket: new ObjectId(`${params.ticket}`) });

        params.populate_ticket ? parking_tickets_with_dynamic_populate.populate('ticket') : null;
        params.populate_parking ? parking_tickets_with_dynamic_populate.populate('parking') : null;

        parking_tickets_with_dynamic_populate.then(
            (doc: any) => {
                if (doc) {
                    success(req, res, "Parking details!", doc);
                } else {
                    error(req, res, "Parking doesn't exists!", "");
                }
            }, err => {
                error(req, res, '', err)
            })

    } catch (err) {
        error(req, res, '', err)
    }
}


//////////////// Parking Tickets End/////////////////////



export default {
    addticket,
    gettickets,
    updatetickets,
    deletetickets,

    addparking_tickets,
    getparking_tickets,
    updateparking_tickets,
    deleteparking_tickets,

    getticket_with_parking_details

};

