import { plu_master } from './plu.schema';
import { Request, Response } from "express";
import { success, error } from '../../service/response.service';
import { ObjectId } from 'mongodb';


// =================== Master start ====================== //

const add_master_file = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        var inputdata = new plu_master(params)
        inputdata.save().then(
            (doc: any) => {
                success(req, res, 'PLU master file added successfully!', doc);
            }, (err: any) => {
                error(req, res, 'PLU master file adding failed!', err);
            }
        )
    } catch (err) {
        error(req, res, '', err)
    }
}


const get_master_files = (req: Request, res: Response) => {
    try {
        let params = req.body;
        var query: any = {};

        params._id ? query['_id'] = new ObjectId(`${params._id}`) : null;
        params.bracode ? query['bracode'] = params.bracode : null;
        params.name ? query['name'] = params.name : null;
        params.size ? query['size'] = new ObjectId(`${params.size}`) : null;
        params.color ? query['color'] = new ObjectId(`${params.color}`) : null;
        params.brand ? query['brand'] = new ObjectId(`${params.brand}`) : null;
        params.category ? query['category'] = new ObjectId(`${params.category}`) : null;
        params.sub_category ? query['sub_category'] = new ObjectId(`${params.sub_category}`) : null;
        params.department ? query['department'] = new ObjectId(`${params.department}`) : null;
        params.sub_department ? query['sub_department'] = new ObjectId(`${params.sub_department}`) : null;

        params.between_dates ? query['discount_details.from_date'] = { $gte: new Date(params.between_dates.from_date) } : null;
        params.between_dates ? query['discount_details.to_date'] = { $gte: new Date(params.between_dates.to_date) } : null;


        let getMastersWithPopulate = plu_master.find(query);

        params.populate_size ? getMastersWithPopulate.populate('size') : null;
        params.populate_color ? getMastersWithPopulate.populate('color') : null;
        params.populate_brand ? getMastersWithPopulate.populate('brand') : null;
        params.populate_category ? getMastersWithPopulate.populate('category') : null;
        params.populate_sub_category ? getMastersWithPopulate.populate('sub_category') : null;
        params.populate_department ? getMastersWithPopulate.populate('department') : null;
        params.populate_sub_department ? getMastersWithPopulate.populate('sub_department') : null;

        getMastersWithPopulate.then((doc: any) => {
            if (doc) {
                success(req, res, "PLU master file details!", doc);
            } else {
                error(req, res, "PLU master file details doesn't exists!", "");
            }
        }, err => {
            error(req, res, '', err)
        })
    } catch (err) {
        error(req, res, '', err)
    }
}

const update_master_file = async (req: Request, res: Response) => {
    try {
        let params = req.body;

        let setQuery: any = {};

        params.bracode ? setQuery['bracode'] = params.bracode : null;
        params.name ? setQuery['name'] = params.name : null;
        params.description ? setQuery['description'] = params.description : null;
        params.size ? setQuery['size'] = new ObjectId(`${params.size}`) : null;
        params.color ? setQuery['color'] = new ObjectId(`${params.color}`) : null;
        params.brand ? setQuery['brand'] = new ObjectId(`${params.brand}`) : null;
        params.category ? setQuery['category'] = new ObjectId(`${params.category}`) : null;
        params.sub_category ? setQuery['sub_category'] = new ObjectId(`${params.sub_category}`) : null;
        params.department ? setQuery['department'] = new ObjectId(`${params.department}`) : null;
        params.sub_department ? setQuery['sub_department'] = new ObjectId(`${params.sub_department}`) : null;

        params.discount_details ? setQuery['discount_details'] = params.discount_details : null;
        params.unit_price ? setQuery['unit_price'] = params.unit_price : null;
        params.tax ? setQuery['tax'] = params.tax : null;
        params.srp ? setQuery['srp'] = params.srp : null;
        params.expiration ? setQuery['expiration'] = params.expiration : null;
        params.images ? setQuery['images'] = params.images : null;

        setQuery['udate'] = new Date();

        plu_master.findOneAndUpdate(
            {
                _id: new ObjectId(`${params._id}`)
            },
            {
                $set: setQuery
            }
        ).then(
            (udoc: any) => {
                if (!udoc) {
                    error(req, res, "PLU master file doesn't exists!", null);
                } else {
                    success(req, res, "PLU master file updated successfully!", {});
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

const delete_master_file = (req: Request, res: Response) => {
    try {
        let params = req.body;
        let query: any = { _id: new ObjectId(`${params._id}`) };
        plu_master.findOneAndDelete(query).then(
            (doc: any) => {
                if (!doc) {
                    error(req, res, "PLU master file doesn't exists!", "");
                } else {
                    success(req, res, "PLU master file deleted successfully!", {});
                }
            }, err => {
                error(req, res, '', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}

// =================== Master end ====================== // 




export default {
    add_master_file,
    get_master_files,
    update_master_file,
    delete_master_file,

};

