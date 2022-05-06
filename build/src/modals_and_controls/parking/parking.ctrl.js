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
const parking_schema_1 = require("./parking.schema");
const response_service_1 = require("../../service/response.service");
const mongodb_1 = require("mongodb");
const addparking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        params['cdate'] = Date.now();
        params['udate'] = Date.now();
        var inputdata = new parking_schema_1.parking(params);
        inputdata.save().then((doc) => {
            (0, response_service_1.success)(req, res, 'Parking slots added successfully!', doc);
        }, (err) => {
            (0, response_service_1.error)(req, res, 'Parking slots adding failed!', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const getparking = (req, res) => {
    try {
        let params = req.body;
        var query = {};
        params._id ? query['_id'] = new mongodb_1.ObjectId(`${params._id}`) : null;
        console.log("query", query);
        parking_schema_1.parking.find(query).then((doc) => {
            if (doc) {
                (0, response_service_1.success)(req, res, "Parking details!", doc);
            }
            else {
                (0, response_service_1.error)(req, res, "Parking slots Doesn't Exists!", "");
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
const updateparking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        let basedOn = {};
        params._id ? basedOn['_id'] = new mongodb_1.ObjectId(`${params._id}`) : null;
        let setQuery = {};
        params.name ? setQuery['name'] = params.name : null;
        params.image ? setQuery['image'] = params.image : null;
        params.location ? setQuery['location'] = params.location : null;
        params.parking_slot_for_packages ? setQuery['parking_slot_for_packages'] = params.parking_slot_for_packages : null;
        params.vallet_parking_slots ? setQuery['vallet_parking_slots'] = params.vallet_parking_slots : null;
        params.vip_parking_slots ? setQuery['vip_parking_slots'] = params.vip_parking_slots : null;
        params.description ? setQuery['description'] = params.description : null;
        parking_schema_1.parking.findOneAndUpdate(basedOn, { $set: setQuery }).then((udoc) => {
            if (!udoc) {
                (0, response_service_1.error)(req, res, "Parking slots doesn't exists!", null);
            }
            else {
                (0, response_service_1.success)(req, res, "Parking slots updated successfully!", {});
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const deleteparking = (req, res) => {
    try {
        let params = req.body;
        let query = {
            "_id": new mongodb_1.ObjectId(`${params._id}`)
        };
        parking_schema_1.parking.findOneAndDelete(query).then((doc) => {
            if (!doc) {
                (0, response_service_1.error)(req, res, "Parking slots doesn't exists!", "");
            }
            else {
                (0, response_service_1.success)(req, res, "Parking slots deleted successfully!", {});
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
    addparking,
    getparking,
    updateparking,
    deleteparking,
};
//# sourceMappingURL=parking.ctrl.js.map