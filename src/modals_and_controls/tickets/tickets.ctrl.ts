import { tickets } from './tickets.schema';
import { Request, Response } from "express";
import { success, error } from '../../service/response.service';
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

const addmultipletickets = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        let insertingData: any = [];
        params.tickets.forEach((tkt: any) => {
            insertingData.push({ ...tkt, cdate: Date.now(), udate: Date.now() })
        });

        let tkt = params.tickets[0];
        let deleteQuery: any = {
            concert_id: tkt.concert_id,
            concert_venue_id: tkt.concert_venue_id,
            event_date: new Date(tkt.event_date),
            stage_setup: tkt.stage_setup
        };

        tickets.deleteMany(deleteQuery, { multi: true }).then(
            (doc: any) => {

                tickets.insertMany(insertingData).then(
                    (doc: any) => {
                        success(req, res, 'Tickets uploaded successfully!', doc);
                    }, (err: any) => {
                        error(req, res, 'Tickets uploading failed!', err);
                    }
                )

            }, err => {
                error(req, res, '', err)
            }
        )

        // tickets.insertMany(insertingData).then(
        //     (doc: any) => {
        //         success(req, res, 'Tickets added successfully!', doc);
        //     }, (err: any) => {
        //         error(req, res, 'Tickets adding failed!', err);
        //     }
        // )
    } catch (err) {
        error(req, res, '', err)
    }
}


const gettickets = (req: Request, res: Response) => {
    try {
        let params = req.body;
        var query: any = {};

        params._id ? query['_id'] = new ObjectId(`${params._id}`) : null;
        params.concert_id ? query['concert_id'] = params.concert_id : null;
        params.concert_title ? query['concert_title'] = params.concert_title : null;

        params.concert_venue_id ? query['concert_venue_id'] = params.concert_venue_id : null;
        params.concert_venue_name ? query['concert_venue_name'] = params.concert_venue_name : null;

        params.event_date ? query['event_date'] = params.event_date : null;
        params.stage_setup ? query['stage_setup'] = params.stage_setup : null;

        params.area ? query['area'] = params.area : null;
        params.row_letter ? query['row_letter'] = params.row_letter : null;
        params.seat_number ? query['seat_number'] = params.seat_number : null;
        params.ticket_code ? query['ticket_code'] = params.ticket_code : null;
        params.ticket_price ? query['ticket_price'] = params.ticket_price : null;
        params.ticket_status ? query['ticket_status'] = params.ticket_status : null;
        params.between_dates ? query['event_date'] = { $gte: new Date(params.between_dates.start_date), $lt: new Date(params.between_dates.end_date) } : null;

        tickets.find(query).then(
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
        params.basedon._id ? basedOn['_id'] = new ObjectId(`${params._id}`) : null;
        params.basedon.concert_id ? basedOn['concert_id'] = params.basedon.concert_id : null;
        params.basedon.concert_venue_id ? basedOn['concert_venue_id'] = params.basedon.concert_venue_id : null;
        params.basedon.area ? basedOn['area'] = params.basedon.area : null;
        params.basedon.row_letter ? basedOn['row_letter'] = params.basedon.row_letter : null;
        params.basedon.seat_number ? basedOn['seat_number'] = params.basedon.seat_number : null;

        let setQuery: any = {};
        params.update.event_date ? setQuery['event_date'] = params.update.event_date : null;
        params.update.stage_setup ? setQuery['stage_setup'] = params.update.stage_setup : null;
        params.update.area ? setQuery['area'] = params.update.area : null;
        params.update.row_letter ? setQuery['row_letter'] = params.update.row_letter : null;
        params.update.seat_number ? setQuery['seat_number'] = params.update.seat_number : null;
        params.update.ticket_code ? setQuery['ticket_code'] = params.update.ticket_code : null;
        params.update.ticket_price ? setQuery['ticket_price'] = params.update.ticket_price : null;
        params.update.ticket_status ? setQuery['ticket_status'] = params.update.ticket_status : null;

        setQuery['udate'] = Date.now();

        tickets.updateMany(basedOn,
            {
                $set: setQuery
            }, { multi: true }
        ).then(
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

        let query: any = {};
        params._id ? query['_id'] = new ObjectId(`${params._id}`) : null;
        params.concert_id ? query['concert_id'] = params.concert_id : null;
        params.concert_venue_id ? query['concert_venue_id'] = params.concert_venue_id : null;
        params.area ? query['area'] = params.area : null;
        params.row_letter ? query['row_letter'] = params.row_letter : null;
        params.seat_number ? query['seat_number'] = params.seat_number : null;

        tickets.deleteMany(query, { multi: true }).then(
            (doc: any) => {
                if (!doc) {
                    error(req, res, "Tickets doesn't exists!", "");
                } else {
                    success(req, res, "Tickets deleted successfully!", {});
                }
            }, err => {
                error(req, res, '', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}

export default {
    addticket,
    addmultipletickets,
    gettickets,
    updatetickets,
    deletetickets,
};

