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
const artist_schema_1 = require("./artist.schema");
const response_service_1 = require("../../service/response.service");
const mongodb_1 = require("mongodb");
const error_handler_service_1 = require("../../service/error-handler.service");
const addartist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        params['cdate'] = Date.now();
        params['udate'] = Date.now();
        var inputdata = new artist_schema_1.artist(params);
        inputdata.save().then((doc) => {
            (0, response_service_1.success)(req, res, 'Artist added successfully!', doc);
        }, (err) => {
            (0, response_service_1.error)(req, res, (0, error_handler_service_1.artistErrs)(err), null);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const getartist = (req, res) => {
    try {
        let params = req.body;
        var query = {};
        params.name ? query['name'] = params.name : null;
        params._id ? query['_id'] = new mongodb_1.ObjectId(`${params._id}`) : null;
        params.artist_ids ? query['_id'] = { $in: params.artist_ids } : null;
        artist_schema_1.artist.find(query).then((doc) => {
            if (doc) {
                (0, response_service_1.success)(req, res, "Artist details!", doc);
            }
            else {
                (0, response_service_1.error)(req, res, "Artist doesn't exists!", "");
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
const getartist_with_eventcount = (req, res) => {
    try {
        let params = req.body;
        var query = {};
        params.name ? query['name'] = params.name : null;
        params._id ? query['_id'] = new mongodb_1.ObjectId(`${params._id}`) : null;
        params.artist_ids ? query['_id'] = { $in: params.artist_ids } : null;
        artist_schema_1.artist.aggregate([
            { $match: query },
            {
                $lookup: {
                    from: "events",
                    let: { artist_id: "$_id" },
                    pipeline: [{
                            $match: {
                                $expr: {
                                    $or: [
                                        { $in: ["$$artist_id", "$performers"] },
                                        { $eq: ["$$artist_id", "$main_artist"] },
                                    ]
                                }
                            }
                        }],
                    as: "participated_events"
                }
            },
            {
                "$addFields": {
                    "participated_events_count": { $size: "$participated_events" }
                }
            },
            {
                $project: {
                    participated_events: 0
                }
            }
        ]).then((doc) => {
            if (doc) {
                (0, response_service_1.success)(req, res, "Artist details!", doc);
            }
            else {
                (0, response_service_1.error)(req, res, "Artist doesn't exists!", "");
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
const updateartist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    try {
        let params = req.body;
        let setQuery = {};
        params.name ? setQuery['name'] = params.name : null;
        params.description ? setQuery['description'] = params.description : null;
        params.photo_url ? setQuery['photo_url'] = params.photo_url : null;
        ((_a = params.social_media) === null || _a === void 0 ? void 0 : _a.facebook) ? setQuery['social_media.facebook'] = params.social_media.facebook : null;
        ((_b = params.social_media) === null || _b === void 0 ? void 0 : _b.twitter) ? setQuery['social_media.twitter'] = params.social_media.twitter : null;
        ((_c = params.social_media) === null || _c === void 0 ? void 0 : _c.instagram) ? setQuery['social_media.instagram'] = params.social_media.instagram : null;
        ((_d = params.social_media) === null || _d === void 0 ? void 0 : _d.youtube) ? setQuery['social_media.youtube'] = params.social_media.youtube : null;
        ((_e = params.social_media) === null || _e === void 0 ? void 0 : _e.soundcloud) ? setQuery['social_media.soundcloud'] = params.social_media.soundcloud : null;
        ((_f = params.social_media) === null || _f === void 0 ? void 0 : _f.bandcamp) ? setQuery['social_media.bandcamp'] = params.social_media.bandcamp : null;
        ((_g = params.social_media) === null || _g === void 0 ? void 0 : _g.spotify) ? setQuery['social_media.spotify'] = params.social_media.spotify : null;
        ((_h = params.social_media) === null || _h === void 0 ? void 0 : _h.tumblr) ? setQuery['social_media.tumblr'] = params.social_media.tumblr : null;
        ((_j = params.social_media) === null || _j === void 0 ? void 0 : _j.musicradar) ? setQuery['social_media.musicradar'] = params.social_media.musicradar : null;
        setQuery['udate'] = Date.now();
        artist_schema_1.artist.findOneAndUpdate({
            _id: new mongodb_1.ObjectId(`${params._id}`)
        }, {
            $set: setQuery
        }).then((udoc) => {
            if (!udoc) {
                (0, response_service_1.error)(req, res, "Artist doesn't exists!", null);
            }
            else {
                (0, response_service_1.success)(req, res, "Artist updated successfully!", {});
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const deleteartist = (req, res) => {
    try {
        let params = req.body;
        let query = { _id: new mongodb_1.ObjectId(`${params._id}`) };
        artist_schema_1.artist.findOneAndDelete(query).then((doc) => {
            if (!doc) {
                (0, response_service_1.error)(req, res, "Artist doesn't exists!", "");
            }
            else {
                (0, response_service_1.success)(req, res, "Artist deleted successfully!", {});
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
    addartist,
    getartist,
    updateartist,
    deleteartist,
    getartist_with_eventcount
};
//# sourceMappingURL=artist.ctrl.js.map