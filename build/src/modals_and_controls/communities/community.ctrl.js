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
const community_schema_1 = require("./community.schema");
const response_service_1 = require("../../service/response.service");
const mongodb_1 = require("mongodb");
const addcommunity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        community_schema_1.communities.findOne({ community_name: params.community_name }).then((udoc) => __awaiter(void 0, void 0, void 0, function* () {
            if (udoc) {
                (0, response_service_1.error)(req, res, 'Community Name already exist!', null);
            }
            else {
                params['cdate'] = Date.now();
                params['udate'] = Date.now();
                var inputdata = new community_schema_1.communities(params);
                inputdata.save().then((doc) => {
                    (0, response_service_1.success)(req, res, 'Community added successfully!', doc);
                }, (err) => {
                    (0, response_service_1.error)(req, res, 'Community adding failed!', err);
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
const getcommunity = (req, res) => {
    try {
        let params = req.body;
        var query = {};
        params.community_name ? query['community_name'] = params.community_name : null;
        params._id ? query['_id'] = new mongodb_1.ObjectId(`${params._id}`) : null;
        community_schema_1.communities.find(query).then((doc) => {
            if (doc) {
                (0, response_service_1.success)(req, res, "Community Details!", doc);
            }
            else {
                (0, response_service_1.error)(req, res, "Community Doesn't Exists!", "");
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
const updatecommunity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        let setQuery = {};
        params.community_name ? setQuery['community_name'] = params.community_name : null;
        setQuery['udate'] = Date.now();
        community_schema_1.communities.findOneAndUpdate({
            _id: new mongodb_1.ObjectId(`${params._id}`)
        }, {
            $set: setQuery
        }).then((udoc) => {
            if (!udoc) {
                (0, response_service_1.error)(req, res, "Community doesn't exists!", null);
            }
            else {
                (0, response_service_1.success)(req, res, "Community updated successfully!", {});
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const deletecommunity = (req, res) => {
    try {
        let params = req.body;
        let query = { _id: new mongodb_1.ObjectId(`${params._id}`) };
        community_schema_1.communities.findOneAndDelete(query).then((doc) => {
            if (!doc) {
                (0, response_service_1.error)(req, res, "Community doesn't exists!", "");
            }
            else {
                (0, response_service_1.success)(req, res, "Community deleted successfully!", {});
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
    addcommunity,
    getcommunity,
    updatecommunity,
    deletecommunity
};
//# sourceMappingURL=community.ctrl.js.map