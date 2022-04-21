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
const genre_schema_1 = require("./genre.schema");
const response_service_1 = require("../../service/response.service");
const mongodb_1 = require("mongodb");
const addgenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        genre_schema_1.genre.findOne({ name: params.name }).then((udoc) => __awaiter(void 0, void 0, void 0, function* () {
            if (udoc) {
                (0, response_service_1.error)(req, res, 'Genre already exist!', null);
            }
            else {
                params['cdate'] = Date.now();
                params['udate'] = Date.now();
                var inputdata = new genre_schema_1.genre(params);
                inputdata.save().then((doc) => {
                    (0, response_service_1.success)(req, res, 'Genre added successfully!', doc);
                }, (err) => {
                    (0, response_service_1.error)(req, res, 'Genre adding failed!', err);
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
const getgenre = (req, res) => {
    try {
        let params = req.body;
        var query = {};
        params.name ? query['name'] = params.name : null;
        params._id ? query['_id'] = new mongodb_1.ObjectId(`${params._id}`) : null;
        genre_schema_1.genre.find(query).then((doc) => {
            if (doc) {
                (0, response_service_1.success)(req, res, "Genre Details!", doc);
            }
            else {
                (0, response_service_1.error)(req, res, "Genre Doesn't Exists!", "");
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
const updategenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        genre_schema_1.genre.findOneAndUpdate({
            _id: new mongodb_1.ObjectId(`${params._id}`)
        }, {
            $set: {
                name: params.name
            }
        }).then((udoc) => {
            if (!udoc) {
                (0, response_service_1.error)(req, res, "Genre doesn't exists!", null);
            }
            else {
                (0, response_service_1.success)(req, res, "Genre updated successfully!", udoc);
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const deletegenre = (req, res) => {
    try {
        let params = req.body;
        let query = { _id: new mongodb_1.ObjectId(`${params._id}`) };
        genre_schema_1.genre.findOneAndDelete(query).then((doc) => {
            if (!doc) {
                (0, response_service_1.error)(req, res, "Genre doesn't exists!", "");
            }
            else {
                (0, response_service_1.success)(req, res, "Genre deleted successfully!", {});
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
    addgenre,
    getgenre,
    updategenre,
    deletegenre,
};
//# sourceMappingURL=genre.ctrl.js.map