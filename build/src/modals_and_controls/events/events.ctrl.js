"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_schema_1 = require("./events.schema");
const tickets_schema_1 = require("./tickets/tickets.schema");
const packages_schema_1 = require("./packages/packages.schema");
const response_service_1 = require("../../service/response.service");
const mongodb_1 = require("mongodb");
const user_schema_1 = require("../user/user.schema");
const addevent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        params['cdate'] = Date.now();
        params['udate'] = Date.now();
        var inputdata = new events_schema_1.events(params);
        inputdata.save().then((doc) => {
            (0, response_service_1.success)(req, res, 'Concert added successfully!', doc);
        }, (err) => {
            (0, response_service_1.error)(req, res, 'Concert adding failed!', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const getevents = (req, res) => {
    try {
        let params = req.body;
        var query = {};
        params._id ? query['_id'] = new mongodb_1.ObjectId(`${params._id}`) : null;
        params.concert_title ? query['concert_title'] = params.concert_title : null;
        params.concert_type ? query['concert_type'] = params.concert_type : null;
        params.main_artist ? query['main_artist'] = params.main_artist : null;
        params.capacity ? query['capacity'] = params.capacity : null;
        params.genre ? query['genre'] = params.genre : null;
        params.country ? query['country'] = params.country : null;
        params.community ? query['community'] = params.community : null;
        params.artist_name ? query['performers'] = { $elemMatch: { artist_name: params.artist_name } } : null;
        params.venue_name ? query['venues'] = { $elemMatch: { venue_name: params.venue_name } } : null;
        params.start_date ? query['start_date'] = params.start_date : null;
        params.end_date ? query['end_date'] = params.end_date : null;
        params.between_dates ? query['$or'] = [{
                start_date: { $gte: new Date(params.between_dates.start_date), $lt: new Date(params.between_dates.end_date) }
            }, {
                end_date: { $gt: new Date(params.between_dates.start_date), $lte: new Date(params.between_dates.end_date) }
            }] : null;
        events_schema_1.events.find(query).then((doc) => {
            if (doc) {
                (0, response_service_1.success)(req, res, "Concert Details!", doc);
            }
            else {
                (0, response_service_1.error)(req, res, "Concert Doesn't Exists!", "");
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
const updateevent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        let setQuery = {};
        params.concert_title ? setQuery['concert_title'] = params.concert_title : null;
        params.concert_type ? setQuery['concert_type'] = params.concert_type : null;
        params.main_artist ? setQuery['main_artist'] = params.main_artist : null;
        params.capacity ? setQuery['capacity'] = params.capacity : null;
        params.genre ? setQuery['genre'] = params.genre : null;
        params.start_date ? setQuery['start_date'] = params.start_date : null;
        params.end_date ? setQuery['end_date'] = params.end_date : null;
        params.country ? setQuery['country'] = params.country : null;
        params.community ? setQuery['community'] = params.community : null;
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
        events_schema_1.events.findOneAndUpdate({
            _id: new mongodb_1.ObjectId(`${params._id}`)
        }, {
            $set: setQuery
        }).then((udoc) => {
            if (!udoc) {
                (0, response_service_1.error)(req, res, "Concert doesn't exists!", null);
            }
            else {
                (0, response_service_1.success)(req, res, "Concert updated successfully!", {});
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const deleteevent = (req, res) => {
    try {
        let params = req.body;
        tickets_schema_1.tickets.find({ concert_id: params._id }).then((tkts) => {
            let ticket_ids = tkts.map((tk) => tk._id);
            Promise.all([
                tickets_schema_1.tickets.deleteMany({ concert_id: params._id }),
                events_schema_1.events.deleteOne({ _id: new mongodb_1.ObjectId(`${params._id}`) }),
                tickets_schema_1.parking_tickets.deleteMany({ ticket_id: { $in: ticket_ids } }),
                packages_schema_1.packages.deleteMany({ ticket_id: { $in: ticket_ids } })
            ]).then((doc) => {
                if (!doc) {
                    (0, response_service_1.error)(req, res, "Concert doesn't exists!", "");
                }
                else {
                    (0, response_service_1.success)(req, res, "Concert deleted successfully!", doc);
                }
            }, err => {
                (0, response_service_1.error)(req, res, '', err);
            });
        }, err => {
            (0, response_service_1.error)(req, res, "", err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
const geteventsforyou = (req, res) => {
    try {
        let params = req.body;
        params.current_date = new Date();
        user_schema_1.user.findOne({ _id: new mongodb_1.ObjectId(`${params.user_id}`) }).then((userDoc) => {
            if (!userDoc) {
                (0, response_service_1.error)(req, res, "User doesn't exists!", "");
            }
            else {
                let eventQuery = {};
                if (userDoc.preferred_genres.length > 0) {
                    let genres_names = [];
                    userDoc.preferred_genres.map((genre) => {
                        genres_names.push(genre.name);
                    });
                    eventQuery['genre'] = { $in: genres_names };
                }
                // eventQuery['start_date'] = { $gte: new Date(params.current_date) };
                eventQuery['end_date'] = { $gte: new Date(params.current_date) };
                console.log("eventQuery::::", eventQuery);
                let required_fields = { _id: 1, concert_title: 1, start_date: 1, end_date: 1, country: 1, concert_type: 1, genre: 1, graphic_content: 1 };
                events_schema_1.events.find(eventQuery, required_fields).sort('start_date').then((doc) => {
                    if (!doc) {
                        (0, response_service_1.error)(req, res, "No events found!", "");
                    }
                    else {
                        (0, response_service_1.success)(req, res, "Events found!", doc);
                    }
                }, err => {
                    (0, response_service_1.error)(req, res, '', err);
                });
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
const geteventsforcarousel = (req, res) => {
    try {
        let params = req.body;
        params.current_date = new Date();
        user_schema_1.user.findOne({ _id: new mongodb_1.ObjectId(`${params.user_id}`) }).then((userDoc) => {
            if (!userDoc) {
                (0, response_service_1.error)(req, res, "User doesn't exists!", "");
            }
            else {
                let eventQuery = {};
                if (userDoc.preferred_genres.length > 0) {
                    let genres_names = [];
                    userDoc.preferred_genres.map((genre) => {
                        genres_names.push(genre.name);
                    });
                    eventQuery['genre'] = { $in: genres_names };
                }
                // eventQuery['start_date'] = { $gte: new Date(params.current_date) };
                eventQuery['end_date'] = { $gte: new Date(params.current_date) };
                eventQuery['add_to_carousel'] = true;
                console.log("eventQuery::::", eventQuery);
                let required_fields = { _id: 1, concert_title: 1, start_date: 1, end_date: 1, country: 1, concert_type: 1, genre: 1, graphic_content: 1 };
                events_schema_1.events.find(eventQuery, required_fields).sort('start_date').then((doc) => {
                    if (!doc) {
                        (0, response_service_1.error)(req, res, "No events found!", "");
                    }
                    else {
                        (0, response_service_1.success)(req, res, "Events found!", doc);
                    }
                }, err => {
                    (0, response_service_1.error)(req, res, '', err);
                });
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
const getfeaturedevents = (req, res) => {
    try {
        let params = req.body;
        params.current_date = new Date();
        user_schema_1.user.findOne({ _id: new mongodb_1.ObjectId(`${params.user_id}`) }).then((userDoc) => {
            if (!userDoc) {
                (0, response_service_1.error)(req, res, "User doesn't exists!", "");
            }
            else {
                let eventQuery = {};
                if (userDoc.preferred_genres.length > 0) {
                    let genres_names = [];
                    userDoc.preferred_genres.map((genre) => {
                        genres_names.push(genre.name);
                    });
                    eventQuery['genre'] = { $in: genres_names };
                }
                // eventQuery['start_date'] = { $gte: new Date(params.current_date) };
                eventQuery['end_date'] = { $gte: new Date(params.current_date) };
                eventQuery['featured'] = true;
                console.log("eventQuery::::", eventQuery);
                let required_fields = { _id: 1, concert_title: 1, start_date: 1, end_date: 1, country: 1, concert_type: 1, genre: 1, graphic_content: 1 };
                events_schema_1.events.find(eventQuery, required_fields).sort('start_date').then((doc) => {
                    if (!doc) {
                        (0, response_service_1.error)(req, res, "No events found!", "");
                    }
                    else {
                        (0, response_service_1.success)(req, res, "Events found!", doc);
                    }
                }, err => {
                    (0, response_service_1.error)(req, res, '', err);
                });
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
exports.default = {
    addevent,
    getevents,
    updateevent,
    deleteevent,
    geteventsforyou,
    geteventsforcarousel,
    getfeaturedevents
};
//# sourceMappingURL=events.ctrl.js.map