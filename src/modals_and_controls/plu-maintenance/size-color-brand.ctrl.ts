import { plu_sizes, plu_colors, plu_brands } from './plu.schema';
import { Request, Response } from "express";
import { success, error } from '../../service/response.service';
import { ObjectId } from 'mongodb';
import { pluBrandErrs, pluColorErrs, pluSizeErrs } from '../../service/error-handler.service';


// =================== sizes start ====================== //

const add_size = async (req: Request, res: Response) => {
    try {
        let params = req.body;

        var inputdata = new plu_sizes(params)
        inputdata.save().then(
            (doc: any) => {
                success(req, res, 'Size Name added successfully!', doc);
            }, (err: any) => {
                error(req, res, pluSizeErrs(err), null);
            }
        )
    } catch (err) {
        error(req, res, '', err)
    }
}


const get_sizes = (req: Request, res: Response) => {
    try {
        let params = req.body;
        var query: any = {};
        params.name ? query['name'] = params.name : null;
        params._id ? query['_id'] = new ObjectId(`${params._id}`) : null;

        plu_sizes.find(query).then((doc: any) => {
            if (doc) {
                success(req, res, "Size details!", doc);
            } else {
                error(req, res, "Size details doesn't exists!", "");
            }
        }, err => {
            error(req, res, '', err)
        })
    } catch (err) {
        error(req, res, '', err)
    }
}

const update_size = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        plu_sizes.findOneAndUpdate(
            {
                _id: new ObjectId(`${params._id}`)
            },
            {
                $set: { name: params.name }
            }
        ).then(
            (udoc: any) => {
                if (!udoc) {
                    error(req, res, "Size doesn't exists!", null);
                } else {
                    success(req, res, "Size updated successfully!", {});
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

const delete_size = (req: Request, res: Response) => {
    try {
        let params = req.body;
        let query: any = { _id: new ObjectId(`${params._id}`) };
        plu_sizes.findOneAndDelete(query).then(
            (doc: any) => {
                if (!doc) {
                    error(req, res, "Size doesn't exists!", "");
                } else {
                    success(req, res, "Size deleted successfully!", {});
                }
            }, err => {
                error(req, res, '', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}


// =================== sizes end ====================== // 



// =================== colors start ====================== //

const add_color = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        var inputdata = new plu_colors(params)
        inputdata.save().then(
            (doc: any) => {
                success(req, res, 'Color Name added successfully!', doc);
            }, (err: any) => {
                error(req, res, pluColorErrs(err), null);
            }
        )
    } catch (err) {
        error(req, res, '', err)
    }
}


const get_colors = (req: Request, res: Response) => {
    try {
        let params = req.body;
        var query: any = {};
        params.name ? query['name'] = params.name : null;
        params._id ? query['_id'] = new ObjectId(`${params._id}`) : null;

        plu_colors.find(query).then((doc: any) => {
            if (doc) {
                success(req, res, "Color details!", doc);
            } else {
                error(req, res, "Color details doesn't exists!", "");
            }
        }, err => {
            error(req, res, '', err)
        })
    } catch (err) {
        error(req, res, '', err)
    }
}

const update_color = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        plu_colors.findOneAndUpdate(
            {
                _id: new ObjectId(`${params._id}`)
            },
            {
                $set: { name: params.name }
            }
        ).then(
            (udoc: any) => {
                if (!udoc) {
                    error(req, res, "Color doesn't exists!", null);
                } else {
                    success(req, res, "Color updated successfully!", {});
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

const delete_color = (req: Request, res: Response) => {
    try {
        let params = req.body;
        let query: any = { _id: new ObjectId(`${params._id}`) };
        plu_colors.findOneAndDelete(query).then(
            (doc: any) => {
                if (!doc) {
                    error(req, res, "Color doesn't exists!", "");
                } else {
                    success(req, res, "Color deleted successfully!", {});
                }
            }, err => {
                error(req, res, '', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}


// =================== colors end ====================== // 




// =================== brands start ====================== //

const add_brand = async (req: Request, res: Response) => {
    try {
        let params = req.body;

        var inputdata = new plu_brands(params)
        inputdata.save().then(
            (doc: any) => {
                success(req, res, 'Brand Name added successfully!', doc);
            }, (err: any) => {
                error(req, res, pluBrandErrs(err), null);
            }
        )
    } catch (err) {
        error(req, res, '', err)
    }
}


const get_brands = (req: Request, res: Response) => {
    try {
        let params = req.body;
        var query: any = {};
        params.name ? query['name'] = params.name : null;
        params._id ? query['_id'] = new ObjectId(`${params._id}`) : null;

        plu_brands.find(query).then((doc: any) => {
            if (doc) {
                success(req, res, "Brand details!", doc);
            } else {
                error(req, res, "Brand details doesn't exists!", "");
            }
        }, err => {
            error(req, res, '', err)
        })
    } catch (err) {
        error(req, res, '', err)
    }
}

const update_brand = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        plu_brands.findOneAndUpdate(
            {
                _id: new ObjectId(`${params._id}`)
            },
            {
                $set: { name: params.name, description: params.description }
            }
        ).then(
            (udoc: any) => {
                if (!udoc) {
                    error(req, res, "Brand doesn't exists!", null);
                } else {
                    success(req, res, "Brand updated successfully!", {});
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

const delete_brand = (req: Request, res: Response) => {
    try {
        let params = req.body;
        let query: any = { _id: new ObjectId(`${params._id}`) };
        plu_brands.findOneAndDelete(query).then(
            (doc: any) => {
                if (!doc) {
                    error(req, res, "Brand doesn't exists!", "");
                } else {
                    success(req, res, "Brand deleted successfully!", {});
                }
            }, err => {
                error(req, res, '', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}


// =================== brands end ====================== // 




export default {
    //sizes
    add_size,
    get_sizes,
    update_size,
    delete_size,

    // colors
    add_color,
    get_colors,
    update_color,
    delete_color,

    // brands
    add_brand,
    get_brands,
    update_brand,
    delete_brand

};

