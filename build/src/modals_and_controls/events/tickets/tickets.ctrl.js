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
const packages_schema_1 = require("../packages/packages.schema");
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
        params.concert ? query['concert'] = new mongodb_1.ObjectId(`${params.concert}`) : null;
        params.venue ? query['venue'] = new mongodb_1.ObjectId(`${params.venue}`) : null;
        params.event_date ? query['event_date'] = params.event_date : null;
        params.stage_setup ? query['stage_setup'] = params.stage_setup : null;
        params.between_dates ? query['event_date'] = { $gte: new Date(params.between_dates.start_date), $lt: new Date(params.between_dates.end_date) } : null;
        params.event_date_gt ? query['event_date'] = { $gte: new Date(params.event_date_gt) } : null;
        let removeQuery = {};
        params.remove_areas ? removeQuery['areas'] = 0 : null;
        params.remove_rows ? removeQuery['areas.rows'] = 0 : null;
        let ticketsWithDynamicPopulate = tickets_schema_1.tickets.find(query, removeQuery);
        params.populate_concert ? ticketsWithDynamicPopulate.populate('concert') : null;
        params.populate_venue ? ticketsWithDynamicPopulate.populate('venue') : null;
        ticketsWithDynamicPopulate.then((doc) => {
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
        params.concert ? basedOn['concert'] = new mongodb_1.ObjectId(`${params.concert}`) : null;
        params.venue ? basedOn['venue'] = new mongodb_1.ObjectId(`${params.venue}`) : null;
        params.stage_setup ? basedOn['stage_setup'] = params.stage_setup : null;
        params.area_id ? basedOn['areas'] = { $elemMatch: { _id: new mongodb_1.ObjectId(`${params.area_id}`) } } : null;
        let setQuery = {};
        params.event_date ? setQuery['event_date'] = params.event_date : null;
        params.start_time ? setQuery['start_time'] = params.start_time : null;
        params.end_time ? setQuery['end_time'] = params.end_time : null;
        params.areas ? setQuery['areas'] = params.areas : null;
        params.price ? setQuery["areas.$.price"] = params.price : null;
        params.price_type ? setQuery["areas.$.price_type"] = params.price_type : null;
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
        Promise.all([
            tickets_schema_1.tickets.deleteMany({ _id: new mongodb_1.ObjectId(`${params._id}`) }),
            tickets_schema_1.parking_tickets.deleteMany({ ticket_id: params._id }),
            packages_schema_1.packages.deleteMany({ ticket_id: params._id })
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
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
//////////////// Parking Tickets Start/////////////////////
const addparking_tickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        tickets_schema_1.parking_tickets.findOne({ ticket: new mongodb_1.ObjectId(`${params.ticket}`), parking: new mongodb_1.ObjectId(`${params.parking}`) }).then((udoc) => __awaiter(void 0, void 0, void 0, function* () {
            if (udoc) {
                (0, response_service_1.error)(req, res, 'Parking already exist!', null);
            }
            else {
                params['cdate'] = Date.now();
                params['udate'] = Date.now();
                var inputdata = new tickets_schema_1.parking_tickets(params);
                inputdata.save().then((doc) => {
                    (0, response_service_1.success)(req, res, 'Parking added successfully!', doc);
                }, (err) => {
                    (0, response_service_1.error)(req, res, 'Parking adding failed!', err);
                });
            }
        }), err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const getparking_tickets = (req, res) => {
    try {
        let params = req.body;
        var query = {};
        params._id ? query['_id'] = new mongodb_1.ObjectId(`${params._id}`) : null;
        params.ticket ? query['ticket'] = new mongodb_1.ObjectId(`${params.ticket}`) : null;
        params.parking ? query['parking'] = new mongodb_1.ObjectId(`${params.parking}`) : null;
        params.parking_type ? query['parking_type'] = params.parking_type : null;
        let removeQuery = {};
        params.remove_parking_seats ? removeQuery['parking_seats'] = 0 : null;
        tickets_schema_1.parking_tickets.find(query, removeQuery)
            .populate('parking')
            .then((doc) => {
            if (doc) {
                (0, response_service_1.success)(req, res, "Parking Details!", doc);
            }
            else {
                (0, response_service_1.error)(req, res, "Parking Doesn't Exists!", "");
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
const updateparking_tickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        let basedOn = {};
        params._id ? basedOn['_id'] = new mongodb_1.ObjectId(`${params._id}`) : null;
        let setQuery = {};
        params.price ? setQuery['price'] = params.price : null;
        params.price_type ? setQuery['price_type'] = params.price_type : null;
        params.distance ? setQuery['distance'] = params.distance : null;
        params.parking ? setQuery['parking'] = new mongodb_1.ObjectId(`${params.parking}`) : null;
        params.parking_type ? setQuery['parking_type'] = params.parking_type : null;
        params.parking_seats ? setQuery['parking_seats'] = params.parking_seats : null;
        tickets_schema_1.parking_tickets.findOneAndUpdate(basedOn, { $set: setQuery }).then((udoc) => {
            if (!udoc) {
                (0, response_service_1.error)(req, res, "Parking doesn't exists!", null);
            }
            else {
                (0, response_service_1.success)(req, res, "Parking updated successfully!", {});
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const deleteparking_tickets = (req, res) => {
    try {
        let params = req.body;
        let query = {
            "_id": new mongodb_1.ObjectId(`${params._id}`)
        };
        tickets_schema_1.parking_tickets.findOneAndDelete(query).then((doc) => {
            if (!doc) {
                (0, response_service_1.error)(req, res, "Parking doesn't exists!", "");
            }
            else {
                (0, response_service_1.success)(req, res, "Parking deleted successfully!", {});
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
const getticket_with_parking_details = (req, res) => {
    try {
        let params = req.body;
        let parking_tickets_with_dynamic_populate = tickets_schema_1.parking_tickets.find({ ticket: new mongodb_1.ObjectId(`${params.ticket}`) });
        params.populate_ticket ? parking_tickets_with_dynamic_populate.populate('ticket') : null;
        params.populate_parking ? parking_tickets_with_dynamic_populate.populate('parking') : null;
        parking_tickets_with_dynamic_populate.then((doc) => {
            if (doc) {
                (0, response_service_1.success)(req, res, "Parking details!", doc);
            }
            else {
                (0, response_service_1.error)(req, res, "Parking doesn't exists!", "");
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
//////////////// Parking Tickets End/////////////////////
exports.default = {
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
//# sourceMappingURL=tickets.ctrl.js.map