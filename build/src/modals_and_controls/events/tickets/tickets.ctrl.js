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
const tickets_schema_1 = require("./tickets.schema");
const response_service_1 = require("../../../service/response.service");
const mongodb_1 = require("mongodb");
const addticket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        params['cdate'] = Date.now();
        params['udate'] = Date.now();
        var inputdata = new tickets_schema_1.tickets(params);
        inputdata.save().then((doc) => {
            (0, response_service_1.success)(req, res, 'Ticket added successfully!', doc);
        }, (err) => {
            (0, response_service_1.error)(req, res, 'Ticket adding failed!', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const gettickets = (req, res) => {
    try {
        let params = req.body;
        var query = {};
        params._id ? query['_id'] = new mongodb_1.ObjectId(`${params._id}`) : null;
        params.concert_id ? query['concert_id'] = params.concert_id : null;
        params.concert_title ? query['concert_title'] = params.concert_title : null;
        params.concert_venue_id ? query['concert_venue_id'] = params.concert_venue_id : null;
        params.concert_venue_name ? query['concert_venue_name'] = params.concert_venue_name : null;
        params.event_date ? query['event_date'] = params.event_date : null;
        params.stage_setup ? query['stage_setup'] = params.stage_setup : null;
        params.between_dates ? query['event_date'] = { $gte: new Date(params.between_dates.start_date), $lt: new Date(params.between_dates.end_date) } : null;
        // params.area_id ? query['areas'] = { $elemMatch: { _id: new ObjectId(`${params.area_id}`) } } : null;
        let removeQuery = {};
        params.remove_areas ? removeQuery['areas'] = 0 : null;
        params.remove_rows ? removeQuery['areas.rows'] = 0 : null;
        tickets_schema_1.tickets.find(query, removeQuery).then((doc) => {
            if (doc) {
                (0, response_service_1.success)(req, res, "Ticket Details!", doc);
            }
            else {
                (0, response_service_1.error)(req, res, "Ticket Doesn't Exists!", "");
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
const updatetickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        let basedOn = {};
        params._id ? basedOn['_id'] = new mongodb_1.ObjectId(`${params._id}`) : null;
        params.concert_id ? basedOn['concert_id'] = params.concert_id : null;
        params.concert_venue_id ? basedOn['concert_venue_id'] = params.concert_venue_id : null;
        params.stage_setup ? basedOn['stage_setup'] = params.stage_setup : null;
        params.area_id ? basedOn['areas'] = { $elemMatch: { _id: new mongodb_1.ObjectId(`${params.area_id}`) } } : null;
        let setQuery = {};
        params.event_date ? setQuery['event_date'] = params.event_date : null;
        params.start_time ? setQuery['start_time'] = params.start_time : null;
        params.end_time ? setQuery['end_time'] = params.end_time : null;
        params.areas ? setQuery['areas'] = params.areas : null;
        params.price ? setQuery["areas.$.price"] = params.price : null;
        params.points ? setQuery["areas.$.points"] = params.points : null;
        tickets_schema_1.tickets.findOneAndUpdate(basedOn, { $set: setQuery }).then((udoc) => {
            if (!udoc) {
                (0, response_service_1.error)(req, res, "Tickets doesn't exists!", null);
            }
            else {
                (0, response_service_1.success)(req, res, "Tickets updated successfully!", {});
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const deletetickets = (req, res) => {
    try {
        let params = req.body;
        let query = {
            "_id": new mongodb_1.ObjectId(`${params._id}`)
        };
        tickets_schema_1.tickets.findOneAndDelete(query).then((doc) => {
            if (!doc) {
                (0, response_service_1.error)(req, res, "Tickets doesn't exists!", "");
            }
            else {
                (0, response_service_1.success)(req, res, "Tickets deleted successfully!", {});
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
    addticket,
    gettickets,
    updatetickets,
    deletetickets,
};
//# sourceMappingURL=tickets.ctrl.js.map