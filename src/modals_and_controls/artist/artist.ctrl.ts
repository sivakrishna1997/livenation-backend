import { artist } from './artist.schema';
import { Request, Response } from "express";
import { success, error } from '../../service/response.service';
import { ObjectId } from 'mongodb';
import { artistErrs } from '../../service/error-handler.service';



const addartist = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        params['cdate'] = Date.now();
        params['udate'] = Date.now();

        var inputdata = new artist(params)
        inputdata.save().then(
            (doc: any) => {
                success(req, res, 'Artist added successfully!', doc);
            }, (err: any) => {
                error(req, res, artistErrs(err), null);
            }
        )
    } catch (err) {
        error(req, res, '', err)
    }
}


const getartist = (req: Request, res: Response) => {
    try {
        let params = req.body;
        var query: any = {};
        params.name ? query['name'] = params.name : null;
        params._id ? query['_id'] = new ObjectId(`${params._id}`) : null;

        params.artist_ids ? query['_id'] = { $in: params.artist_ids } : null;

        artist.find(query).then(
            (doc: any) => {
                if (doc) {
                    success(req, res, "Artist details!", doc);
                } else {
                    error(req, res, "Artist doesn't exists!", "");
                }
            }, err => {
                error(req, res, '', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}


const getartist_with_eventcount = (req: Request, res: Response) => {
    try {
        let params = req.body;
        var query: any = {};
        params.name ? query['name'] = params.name : null;
        params._id ? query['_id'] = new ObjectId(`${params._id}`) : null;

        params.artist_ids ? query['_id'] = { $in: params.artist_ids } : null;

        artist.aggregate([
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
                    as: "paeticipated_events"
                }
            },
            {
                "$addFields": {
                    "participated_events_count": { $size: "$paeticipated_events" }
                }
            },
            {
                $project: {
                    paeticipated_events: 0
                }
            }
        ]).then(
            (doc: any) => {
                if (doc) {
                    success(req, res, "Artist details!", doc);
                } else {
                    error(req, res, "Artist doesn't exists!", "");
                }
            }, err => {
                error(req, res, '', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}

const updateartist = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        let setQuery: any = {};

        params.name ? setQuery['name'] = params.name : null;
        params.description ? setQuery['description'] = params.description : null;
        params.photo_url ? setQuery['photo_url'] = params.photo_url : null;

        params.social_media?.facebook ? setQuery['social_media.facebook'] = params.social_media.facebook : null;
        params.social_media?.twitter ? setQuery['social_media.twitter'] = params.social_media.twitter : null;
        params.social_media?.instagram ? setQuery['social_media.instagram'] = params.social_media.instagram : null;
        params.social_media?.youtube ? setQuery['social_media.youtube'] = params.social_media.youtube : null;
        params.social_media?.soundcloud ? setQuery['social_media.soundcloud'] = params.social_media.soundcloud : null;
        params.social_media?.bandcamp ? setQuery['social_media.bandcamp'] = params.social_media.bandcamp : null;
        params.social_media?.spotify ? setQuery['social_media.spotify'] = params.social_media.spotify : null;
        params.social_media?.tumblr ? setQuery['social_media.tumblr'] = params.social_media.tumblr : null;
        params.social_media?.musicradar ? setQuery['social_media.musicradar'] = params.social_media.musicradar : null;

        setQuery['udate'] = Date.now();

        artist.findOneAndUpdate(
            {
                _id: new ObjectId(`${params._id}`)
            },
            {
                $set: setQuery
            }
        ).then(
            (udoc: any) => {
                if (!udoc) {
                    error(req, res, "Artist doesn't exists!", null);
                } else {
                    success(req, res, "Artist updated successfully!", {});
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

const deleteartist = (req: Request, res: Response) => {
    try {
        let params = req.body;
        let query: any = { _id: new ObjectId(`${params._id}`) };
        artist.findOneAndDelete(query).then(
            (doc: any) => {
                if (!doc) {
                    error(req, res, "Artist doesn't exists!", "");
                } else {
                    success(req, res, "Artist deleted successfully!", {});
                }
            }, err => {
                error(req, res, '', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}

export default {
    addartist,
    getartist,
    updateartist,
    deleteartist,
    getartist_with_eventcount
};

