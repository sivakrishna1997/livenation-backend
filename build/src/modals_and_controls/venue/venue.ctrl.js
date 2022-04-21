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
const venue_schema_1 = require("./venue.schema");
const response_service_1 = require("../../service/response.service");
const mongodb_1 = require("mongodb");
// =================== venue ====================== //
const addvenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        venue_schema_1.venues.findOne({ name: params.name }).then((udoc) => __awaiter(void 0, void 0, void 0, function* () {
            if (udoc) {
                (0, response_service_1.error)(req, res, 'Venue already exist!', null);
            }
            else {
                params['cdate'] = Date.now();
                params['udate'] = Date.now();
                var inputdata = new venue_schema_1.venues(params);
                inputdata.save().then((doc) => {
                    (0, response_service_1.success)(req, res, 'Venue added successfully!', doc);
                }, (err) => {
                    (0, response_service_1.error)(req, res, 'Venue adding failed!', err);
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
const getvenues = (req, res) => {
    try {
        let params = req.body;
        var query = {};
        params.name ? query['name'] = params.name : null;
        params._id ? query['_id'] = new mongodb_1.ObjectId(`${params._id}`) : null;
        params.location ? query['location'] = params.location : null;
        params.capacity ? query['capacity'] = params.capacity : null;
        venue_schema_1.venues.find(query).then((doc) => {
            if (doc) {
                (0, response_service_1.success)(req, res, "Venue Details!", doc);
            }
            else {
                (0, response_service_1.error)(req, res, "Venue Doesn't Exists!", "");
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
const updatevenues = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        let setQuery = {};
        params.name ? setQuery['name'] = params.name : null;
        params.location ? setQuery['location'] = params.location : null;
        params.capacity ? setQuery['capacity'] = params.capacity : null;
        params.stage_layout ? setQuery['stage_layout'] = params.stage_layout : null;
        params.seats ? setQuery['seats'] = params.seats : null;
        params.stages ? setQuery['stages'] = params.stages : null;
        setQuery['udate'] = Date.now();
        venue_schema_1.venues.findOneAndUpdate({
            _id: new mongodb_1.ObjectId(`${params._id}`)
        }, {
            $set: setQuery
        }).then((udoc) => {
            if (!udoc) {
                (0, response_service_1.error)(req, res, "Venue doesn't exists!", null);
            }
            else {
                (0, response_service_1.success)(req, res, "Venue updated successfully!", {});
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const deletevenue = (req, res) => {
    try {
        let params = req.body;
        let query = { _id: new mongodb_1.ObjectId(`${params._id}`) };
        venue_schema_1.venues.findOneAndDelete(query).then((doc) => {
            if (!doc) {
                (0, response_service_1.error)(req, res, "Venue doesn't exists!", "");
            }
            else {
                (0, response_service_1.success)(req, res, "Venue deleted successfully!", {});
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
const addvenuestages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        let query = {
            _id: new mongodb_1.ObjectId(`${params._id}`),
        };
        let stage = {
            stage_id: params.stage_id,
            stage_name: params.stage_name,
        };
        venue_schema_1.venues.findOneAndUpdate(query, { $push: { stages: stage } })
            .then((udoc) => {
            if (udoc) {
                if (udoc.n == 0) {
                    (0, response_service_1.error)(req, res, "Venue stage adding failed!", null);
                }
                else {
                    (0, response_service_1.success)(req, res, "Venue stage added successfully!", {});
                }
            }
            else {
                (0, response_service_1.error)(req, res, "Venue doesn't exists!", null);
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const deletevenuestages = (req, res) => {
    try {
        let params = req.body;
        let query = {
            _id: new mongodb_1.ObjectId(`${params._id}`),
        };
        let stage = {
            _id: new mongodb_1.ObjectId(`${params.venue_stage_id}`),
        };
        venue_schema_1.venues.findOneAndUpdate(query, { $pull: { stages: stage } })
            .then((udoc) => {
            if (udoc) {
                if (udoc.n == 0) {
                    (0, response_service_1.error)(req, res, "Venue stage deleting failed!", null);
                }
                else {
                    (0, response_service_1.success)(req, res, "Venue stage deleted successfully!", {});
                }
            }
            else {
                (0, response_service_1.error)(req, res, "Venue doesn't exists!", null);
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
const addvenueseats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        let query = {
            _id: new mongodb_1.ObjectId(`${params._id}`),
        };
        let seat = {};
        params.name ? seat['name'] = params.name : null;
        params.image ? seat['image'] = params.image : null;
        venue_schema_1.venues.findOneAndUpdate(query, { $push: { seats: seat } })
            .then((udoc) => {
            if (udoc) {
                if (udoc.n == 0) {
                    (0, response_service_1.error)(req, res, "Venue seat adding failed!", null);
                }
                else {
                    (0, response_service_1.success)(req, res, "Venue seat added successfully!", {});
                }
            }
            else {
                (0, response_service_1.error)(req, res, "Venue doesn't exists!", null);
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const deletevenueseats = (req, res) => {
    try {
        let params = req.body;
        let query = {
            _id: new mongodb_1.ObjectId(`${params._id}`),
        };
        let seat = {
            _id: new mongodb_1.ObjectId(`${params.venue_seat_id}`),
        };
        venue_schema_1.venues.findOneAndUpdate(query, { $pull: { seats: seat } })
            .then((udoc) => {
            if (udoc) {
                if (udoc.n == 0) {
                    (0, response_service_1.error)(req, res, "Venue seat deleting failed!", null);
                }
                else {
                    (0, response_service_1.success)(req, res, "Venue seat deleted successfully!", {});
                }
            }
            else {
                (0, response_service_1.error)(req, res, "Venue doesn't exists!", null);
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
// =================== venue ====================== // 
// =================== stages ====================== // 
const addstages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        venue_schema_1.stages.findOne({ name: params.name }).then((udoc) => __awaiter(void 0, void 0, void 0, function* () {
            if (udoc) {
                (0, response_service_1.error)(req, res, 'Stage already exist!', null);
            }
            else {
                params['cdate'] = Date.now();
                params['udate'] = Date.now();
                var inputdata = new venue_schema_1.stages(params);
                inputdata.save().then((doc) => {
                    (0, response_service_1.success)(req, res, 'Stage added successfully!', doc);
                }, (err) => {
                    (0, response_service_1.error)(req, res, 'Stage adding failed!', err);
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
const getstages = (req, res) => {
    try {
        let params = req.body;
        var query = {};
        params.name ? query['name'] = params.name : null;
        params._id ? query['_id'] = new mongodb_1.ObjectId(`${params._id}`) : null;
        venue_schema_1.stages.find(query).then((doc) => {
            if (doc) {
                (0, response_service_1.success)(req, res, "Stage details!", doc);
            }
            else {
                (0, response_service_1.error)(req, res, "Stage doesn't exists!", "");
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
const updatestages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        let setQuery = {};
        params.name ? setQuery['name'] = params.name : null;
        setQuery['udate'] = Date.now();
        venue_schema_1.stages.findOneAndUpdate({
            _id: new mongodb_1.ObjectId(`${params._id}`)
        }, {
            $set: setQuery
        }).then((udoc) => {
            if (!udoc) {
                (0, response_service_1.error)(req, res, "Stage doesn't exists!", null);
            }
            else {
                (0, response_service_1.success)(req, res, "Stage updated successfully!", {});
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const deletestages = (req, res) => {
    try {
        let params = req.body;
        let query = { _id: new mongodb_1.ObjectId(`${params._id}`) };
        venue_schema_1.stages.findOneAndDelete(query).then((doc) => {
            if (!doc) {
                (0, response_service_1.error)(req, res, "Stage doesn't exists!", "");
            }
            else {
                (0, response_service_1.success)(req, res, "Stage deleted successfully!", {});
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
// =================== stages ====================== // 
exports.default = {
    //venue
    addvenue,
    getvenues,
    updatevenues,
    deletevenue,
    //venue stages
    addvenuestages,
    deletevenuestages,
    //venue seats
    addvenueseats,
    deletevenueseats,
    //stages
    addstages,
    getstages,
    updatestages,
    deletestages
};
//# sourceMappingURL=venue.ctrl.js.map