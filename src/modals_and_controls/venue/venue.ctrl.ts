import { venues, stages } from './venue.schema';
import { Request, Response } from "express";
import { success, error } from '../../service/response.service';
import { ObjectId } from 'mongodb';
import { stageErrs, venueErrs } from '../../service/error-handler.service';


// =================== venue ====================== //

const addvenue = async (req: Request, res: Response) => {
    try {
        let params = req.body;

        params['cdate'] = Date.now();
        params['udate'] = Date.now();

        var inputdata = new venues(params)
        inputdata.save().then(
            (doc: any) => {
                success(req, res, 'Venue added successfully!', doc);
            }, (err: any) => {
                error(req, res, venueErrs(err), null);
            }
        )
    } catch (err) {
        error(req, res, '', err)
    }
}


const getvenues = (req: Request, res: Response) => {
    try {
        let params = req.body;
        var query: any = {};
        params.name ? query['name'] = params.name : null;
        params._id ? query['_id'] = new ObjectId(`${params._id}`) : null;
        params.location ? query['location'] = params.location : null;
        params.capacity ? query['capacity'] = params.capacity : null;

        venues.find(query).populate('stages')
            .then((doc: any) => {
                if (doc) {
                    success(req, res, "Venue Details!", doc);
                } else {
                    error(req, res, "Venue Doesn't Exists!", "");
                }
            }, err => {
                error(req, res, '', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}

const updatevenues = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        let setQuery: any = {};
        params.name ? setQuery['name'] = params.name : null;
        params.location ? setQuery['location'] = params.location : null;
        params.capacity ? setQuery['capacity'] = params.capacity : null;
        params.stage_layout ? setQuery['stage_layout'] = params.stage_layout : null;
        params.seats ? setQuery['seats'] = params.seats : null;
        params.stages ? setQuery['stages'] = params.stages : null;
        setQuery['udate'] = Date.now();

        venues.findOneAndUpdate(
            {
                _id: new ObjectId(`${params._id}`)
            },
            {
                $set: setQuery
            }
        ).then(
            (udoc: any) => {
                if (!udoc) {
                    error(req, res, "Venue doesn't exists!", null);
                } else {
                    success(req, res, "Venue updated successfully!", {});
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

const deletevenue = (req: Request, res: Response) => {
    try {
        let params = req.body;
        let query: any = { _id: new ObjectId(`${params._id}`) };
        venues.findOneAndDelete(query).then(
            (doc: any) => {
                if (!doc) {
                    error(req, res, "Venue doesn't exists!", "");
                } else {
                    success(req, res, "Venue deleted successfully!", {});
                }
            }, err => {
                error(req, res, '', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}


// =================== venue ====================== // 



// =================== stages ====================== // 

const addstages = async (req: Request, res: Response) => {
    try {
        let params = req.body;

        params['cdate'] = Date.now();
        params['udate'] = Date.now();

        var inputdata = new stages(params)
        inputdata.save().then(
            (doc: any) => {
                success(req, res, 'Stage added successfully!', doc);
            }, (err: any) => {
                error(req, res, stageErrs(err), null);
            }
        )
    } catch (err) {
        error(req, res, '', err)
    }
}


const getstages = (req: Request, res: Response) => {
    try {
        let params = req.body;
        var query: any = {};
        params.name ? query['name'] = params.name : null;
        params._id ? query['_id'] = new ObjectId(`${params._id}`) : null;
        stages.find(query).then(
            (doc: any) => {
                if (doc) {
                    success(req, res, "Stage details!", doc);
                } else {
                    error(req, res, "Stage doesn't exists!", "");
                }
            }, err => {
                error(req, res, '', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}


const updatestages = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        let setQuery: any = {};

        params.name ? setQuery['name'] = params.name : null;
        setQuery['udate'] = Date.now();

        stages.findOneAndUpdate(
            {
                _id: new ObjectId(`${params._id}`)
            },
            {
                $set: setQuery
            }
        ).then(
            (udoc: any) => {
                if (!udoc) {
                    error(req, res, "Stage doesn't exists!", null);
                } else {
                    success(req, res, "Stage updated successfully!", {});
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

const deletestages = (req: Request, res: Response) => {
    try {
        let params = req.body;
        let query: any = { _id: new ObjectId(`${params._id}`) };
        stages.findOneAndDelete(query).then(
            (doc: any) => {
                if (!doc) {
                    error(req, res, "Stage doesn't exists!", "");
                } else {
                    success(req, res, "Stage deleted successfully!", {});
                }
            }, err => {
                error(req, res, '', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}
// =================== stages ====================== // 







export default {
    //venue
    addvenue,
    getvenues,
    updatevenues,
    deletevenue,

    //stages
    addstages,
    getstages,
    updatestages,
    deletestages
};

