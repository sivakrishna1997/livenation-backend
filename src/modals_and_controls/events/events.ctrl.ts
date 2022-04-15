import { events } from './events.schema';
import { Request, Response } from "express";
import { success, error } from '../../service/response.service';
import { ObjectId } from 'mongodb';


const addevent = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        params['cdate'] = Date.now();
        params['udate'] = Date.now();

        var inputdata = new events(params)
        inputdata.save().then(
            (doc: any) => {
                success(req, res, 'Concert added successfully!', doc);
            }, (err: any) => {
                error(req, res, 'Concert adding failed!', err);
            }
        )

    } catch (err) {
        error(req, res, '', err)
    }
}


const getevents = (req: Request, res: Response) => {
    try {
        let params = req.body;
        var query: any = {};

        params._id ? query['_id'] = new ObjectId(`${params._id}`) : null;
        params.concert_title ? query['concert_title'] = params.concert_title : null;
        params.concert_type ? query['concert_type'] = params.concert_type : null;
        params.main_artist ? query['main_artist'] = params.main_artist : null;
        params.capacity ? query['capacity'] = params.capacity : null;
        params.genre ? query['genre'] = params.genre : null;
        params.artist_name ? query['performers'] = { $elemMatch: { artist_name: params.artist_name } } : null;
        params.venue_name ? query['venues'] = { $elemMatch: { venue_name: params.venue_name } } : null;
        params.start_date ? query['start_date'] = params.start_date : null;
        params.end_date ? query['end_date'] = params.end_date : null;
        params.between_dates ? query['$or'] = [{
            start_date: { $gte: new Date(params.between_dates.start_date), $lt: new Date(params.between_dates.end_date) }
        }, {
            end_date: { $gt: new Date(params.between_dates.start_date), $lte: new Date(params.between_dates.end_date) }
        }] : null

        events.find(query).then(
            (doc: any) => {
                if (doc) {
                    success(req, res, "Concert Details!", doc);
                } else {
                    error(req, res, "Concert Doesn't Exists!", "");
                }
            }, err => {
                error(req, res, '', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}

const updateevent = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        let setQuery: any = {};
        params.concert_title ? setQuery['concert_title'] = params.concert_title : null;
        params.concert_type ? setQuery['concert_type'] = params.concert_type : null;
        params.main_artist ? setQuery['main_artist'] = params.main_artist : null;
        params.capacity ? setQuery['capacity'] = params.capacity : null;
        params.genre ? setQuery['genre'] = params.genre : null;
        params.start_date ? setQuery['start_date'] = params.start_date : null;
        params.end_date ? setQuery['end_date'] = params.end_date : null;
        params.graph_content ? setQuery['graph_content'] = params.graph_content : null;
        params.about ? setQuery['about'] = params.about : null;
        params.performers ? setQuery['performers'] = params.performers : null;
        params.venues ? setQuery['venues'] = params.venues : null;
        params.additional_info ? setQuery['additional_info'] = params.additional_info : null;
        params.active ? setQuery['active'] = true : setQuery['active'] = false;
        setQuery['udate'] = Date.now();

        events.findOneAndUpdate(
            {
                _id: new ObjectId(`${params._id}`)
            },
            {
                $set: setQuery
            }
        ).then(
            (udoc: any) => {
                if (!udoc) {
                    error(req, res, "Concert doesn't exists!", null);
                } else {
                    success(req, res, "Concert updated successfully!", udoc);
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

const deleteevent = (req: Request, res: Response) => {
    try {
        let params = req.body;
        let query: any = { _id: new ObjectId(`${params._id}`) };
        events.findOneAndDelete(query).then(
            (doc: any) => {
                if (!doc) {
                    error(req, res, "Concert doesn't exists!", "");
                } else {
                    success(req, res, "Concert deleted successfully!", {});
                }
            }, err => {
                error(req, res, '', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}

export default {
    addevent,
    getevents,
    updateevent,
    deleteevent,
};

