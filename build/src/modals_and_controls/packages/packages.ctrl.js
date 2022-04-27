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
const packages_schema_1 = require("./packages.schema");
const response_service_1 = require("../../service/response.service");
const mongodb_1 = require("mongodb");
const addpackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        packages_schema_1.packages.findOne({ title: params.title }).then((udoc) => __awaiter(void 0, void 0, void 0, function* () {
            if (udoc) {
                (0, response_service_1.error)(req, res, 'Pacakge already exist!', null);
            }
            else {
                params['cdate'] = Date.now();
                params['udate'] = Date.now();
                var inputdata = new packages_schema_1.packages(params);
                inputdata.save().then((doc) => {
                    (0, response_service_1.success)(req, res, 'Package added successfully!', doc);
                }, (err) => {
                    (0, response_service_1.error)(req, res, 'Package adding failed!', err);
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
const getpackages = (req, res) => {
    try {
        let params = req.body;
        var query = {};
        params.title ? query['title'] = params.title : null;
        params._id ? query['_id'] = new mongodb_1.ObjectId(`${params._id}`) : null;
        packages_schema_1.packages.find(query).then((doc) => {
            if (doc) {
                (0, response_service_1.success)(req, res, "Package details!", doc);
            }
            else {
                (0, response_service_1.error)(req, res, "Package doesn't exists!", "");
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
const updatepackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        let setQuery = {};
        params.title ? setQuery['title'] = params.title : null;
        params.price ? setQuery['price'] = params.price : null;
        params.accumulated_points ? setQuery['accumulated_points'] = params.accumulated_points : null;
        params.available_quantity ? setQuery['available_quantity'] = params.available_quantity : null;
        params.inclusions ? setQuery['inclusions'] = params.inclusions : null;
        setQuery['udate'] = Date.now();
        packages_schema_1.packages.findOneAndUpdate({
            _id: new mongodb_1.ObjectId(`${params._id}`)
        }, {
            $set: setQuery
        }).then((udoc) => {
            if (!udoc) {
                (0, response_service_1.error)(req, res, "Package doesn't exists!", null);
            }
            else {
                (0, response_service_1.success)(req, res, "Package updated successfully!", {});
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const deletepackage = (req, res) => {
    try {
        let params = req.body;
        let query = { _id: new mongodb_1.ObjectId(`${params._id}`) };
        packages_schema_1.packages.findOneAndDelete(query).then((doc) => {
            if (!doc) {
                (0, response_service_1.error)(req, res, "Package doesn't exists!", "");
            }
            else {
                (0, response_service_1.success)(req, res, "Package deleted successfully!", {});
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
    addpackage,
    getpackages,
    updatepackage,
    deletepackage,
};
//# sourceMappingURL=packages.ctrl.js.map