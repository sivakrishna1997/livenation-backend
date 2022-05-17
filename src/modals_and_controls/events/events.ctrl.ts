import { events } from './events.schema';
import { tickets, parking_tickets } from './tickets/tickets.schema';
import { packages } from './packages/packages.schema';

import { Request, Response } from "express";
import { success, error } from '../../service/response.service';
import { ObjectId } from 'mongodb';
import { user } from '../user/user.schema';


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


const geteventbyid = (req: Request, res: Response) => {
    try {
        let params = req.body;
        var query: any = {};
        params._id ? query['_id'] = new ObjectId(`${params._id}`) : null;

        let eventsWithDynamicPopulate = events.findOne(query);

        params.populate_venues ? eventsWithDynamicPopulate.populate('venues') : null;
        params.populate_main_artist ? eventsWithDynamicPopulate.populate('main_artist') : null;
        params.populate_performers ? eventsWithDynamicPopulate.populate('performers') : null;
        params.populate_genre ? eventsWithDynamicPopulate.populate('genre') : null;
        params.populate_community ? eventsWithDynamicPopulate.populate('community') : null;

        eventsWithDynamicPopulate.then(
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
const getevents = (req: Request, res: Response) => {
    try {
        let params = req.body;
        var query: any = {};

        params._id ? query['_id'] = new ObjectId(`${params._id}`) : null;
        params.concert_title ? query['concert_title'] = params.concert_title : null;
        params.concert_type ? query['concert_type'] = params.concert_type : null;
        params.main_artist ? query['main_artist'] = new ObjectId(`${params.main_artist}`) : null;
        params.capacity ? query['capacity'] = params.capacity : null;
        params.genre ? query['genre'] = new ObjectId(`${params.genre}`) : null;
        params.country ? query['country'] = params.country : null;
        params.community ? query['community'] = new ObjectId(`${params.community}`) : null;

        params.start_date ? query['start_date'] = params.start_date : null;
        params.end_date ? query['end_date'] = params.end_date : null;
        params.between_dates ? query['$or'] = [{
            start_date: { $gte: new Date(params.between_dates.start_date), $lt: new Date(params.between_dates.end_date) }
        }, {
            end_date: { $gt: new Date(params.between_dates.start_date), $lte: new Date(params.between_dates.end_date) }
        }] : null


        let eventsWithDynamicPopulate = events.find(query);

        params.populate_venues ? eventsWithDynamicPopulate.populate('venues') : null;
        params.populate_main_artist ? eventsWithDynamicPopulate.populate('main_artist') : null;
        params.populate_performers ? eventsWithDynamicPopulate.populate('performers') : null;
        params.populate_genre ? eventsWithDynamicPopulate.populate('genre') : null;
        params.populate_community ? eventsWithDynamicPopulate.populate('community') : null;

        eventsWithDynamicPopulate.then(
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
        params.main_artist ? setQuery['main_artist'] = new ObjectId(`${params.main_artist}`) : null;
        params.capacity ? setQuery['capacity'] = params.capacity : null;
        params.genre ? setQuery['genre'] = new ObjectId(`${params.genre}`) : null;
        params.start_date ? setQuery['start_date'] = params.start_date : null;
        params.end_date ? setQuery['end_date'] = params.end_date : null;
        params.country ? setQuery['country'] = params.country : null;
        params.community ? setQuery['community'] = new ObjectId(`${params.community}`) : null;

        params.add_to_carousel == true ? setQuery['add_to_carousel'] = true : null;
        params.add_to_carousel == false ? setQuery['add_to_carousel'] = false : null;

        params.featured == true ? setQuery['featured'] = true : null;
        params.featured == false ? setQuery['featured'] = false : null;

        params.graphic_content ? setQuery['graphic_content'] = params.graphic_content : null;
        params.about ? setQuery['about'] = params.about : null;
        params.performers ? setQuery['performers'] = params.performers : null;
        params.venues ? setQuery['venues'] = params.venues : null;
        params.additional_info ? setQuery['additional_info'] = params.additional_info : null;
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
                    success(req, res, "Concert updated successfully!", {});
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
        tickets.find({ concert: new ObjectId(`${params._id}`) }).then(
            (tkts: any) => {
                let ticket_ids = tkts.map((tk: any) => new ObjectId(`${tk._id}`));
                Promise.all([
                    tickets.deleteMany({ concert: new ObjectId(`${params._id}`) }),
                    events.deleteOne({ _id: new ObjectId(`${params._id}`) }),
                    parking_tickets.deleteMany({ ticket: { $in: ticket_ids } }),
                    packages.deleteMany({ ticket: { $in: ticket_ids } })
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
            }, err => {
                error(req, res, "", err);
            })

    } catch (err) {
        error(req, res, '', err)
    }
}



const getuser_genres = (req: Request, res: Response) => {
    try {
        let params = req.body;
        return new Promise((resolve, reject) => {
            user.findOne({ _id: new ObjectId(`${params.user_id}`) }).then(
                (doc: any) => {
                    if (!doc) {
                        error(req, res, "User doesn't exists!", "");
                        return;
                    } else {
                        resolve(doc.preferred_genres);
                    }
                }, err => {
                    error(req, res, '', err);
                    return;
                }
            )
        })
    } catch (err) {
        error(req, res, '', err)
    }
}

const geteventsforyou = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        params.current_date = new Date();
        let preferred_genres: any = await getuser_genres(req, res);
        let eventQuery: any = {};
        eventQuery['genre'] = { $in: preferred_genres }
        eventQuery['end_date'] = { $gte: new Date(params.current_date) };

        let required_fields: any = { _id: 1, concert_title: 1, start_date: 1, end_date: 1, country: 1, concert_type: 1, genre: 1, graphic_content: 1 }

        let eventsWithDynamicPopulate = events.find(eventQuery, required_fields);

        params.populate_venues ? eventsWithDynamicPopulate.populate('venues') : null;
        params.populate_main_artist ? eventsWithDynamicPopulate.populate('main_artist') : null;
        params.populate_performers ? eventsWithDynamicPopulate.populate('performers') : null;
        params.populate_genre ? eventsWithDynamicPopulate.populate('genre') : null;
        params.populate_community ? eventsWithDynamicPopulate.populate('community') : null;

        eventsWithDynamicPopulate.sort('start_date').then(
            (doc: any) => {
                if (!doc) {
                    error(req, res, "No events found!", "");
                } else {
                    success(req, res, "Events found!", doc);
                }
            }, err => {
                error(req, res, '', err)
            })

    } catch (err) {
        error(req, res, '', err)
    }
}


const geteventsforcarousel = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        params.current_date = new Date();

        let preferred_genres: any = await getuser_genres(req, res);

        let eventQuery: any = {};
        eventQuery['genre'] = { $in: preferred_genres }
        eventQuery['end_date'] = { $gte: new Date(params.current_date) };
        eventQuery['add_to_carousel'] = true;

        let required_fields: any = { _id: 1, concert_title: 1, start_date: 1, end_date: 1, country: 1, concert_type: 1, genre: 1, graphic_content: 1 }

        let eventsWithDynamicPopulate = events.find(eventQuery, required_fields);

        params.populate_venues ? eventsWithDynamicPopulate.populate('venues') : null;
        params.populate_main_artist ? eventsWithDynamicPopulate.populate('main_artist') : null;
        params.populate_performers ? eventsWithDynamicPopulate.populate('performers') : null;
        params.populate_genre ? eventsWithDynamicPopulate.populate('genre') : null;
        params.populate_community ? eventsWithDynamicPopulate.populate('community') : null;

        eventsWithDynamicPopulate.sort('start_date').then(
            (doc: any) => {
                if (!doc) {
                    error(req, res, "No events found!", "");
                } else {
                    success(req, res, "Events found!", doc);
                }
            }, err => {
                error(req, res, '', err)
            })

    } catch (err) {
        error(req, res, '', err)
    }
}

const getfeaturedevents = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        params.current_date = new Date();

        let preferred_genres: any = await getuser_genres(req, res);

        let eventQuery: any = {};
        eventQuery['genre'] = { $in: preferred_genres }
        eventQuery['end_date'] = { $gte: new Date(params.current_date) };
        eventQuery['featured'] = true;

        let required_fields: any = { _id: 1, concert_title: 1, start_date: 1, end_date: 1, country: 1, concert_type: 1, genre: 1, graphic_content: 1 }

        let eventsWithDynamicPopulate = events.find(eventQuery, required_fields);

        params.populate_venues ? eventsWithDynamicPopulate.populate('venues') : null;
        params.populate_main_artist ? eventsWithDynamicPopulate.populate('main_artist') : null;
        params.populate_performers ? eventsWithDynamicPopulate.populate('performers') : null;
        params.populate_genre ? eventsWithDynamicPopulate.populate('genre') : null;
        params.populate_community ? eventsWithDynamicPopulate.populate('community') : null;

        eventsWithDynamicPopulate.sort('start_date').then(
            (doc: any) => {
                if (!doc) {
                    error(req, res, "No events found!", "");
                } else {
                    success(req, res, "Events found!", doc);
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
    geteventbyid,
    updateevent,
    deleteevent,
    geteventsforyou,
    geteventsforcarousel,
    getfeaturedevents
};

