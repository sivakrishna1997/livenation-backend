import { plu_categories, plu_sub_categories } from './plu.schema';
import { Request, Response } from "express";
import { success, error } from '../../service/response.service';
import { ObjectId } from 'mongodb';
import { pluCategoryErrs, pluSubCategoryErrs } from '../../service/error-handler.service';


// =================== Category start ====================== //

const add_category = async (req: Request, res: Response) => {
    try {
        let params = req.body;

        var inputdata = new plu_categories(params)
        inputdata.save().then(
            (doc: any) => {
                success(req, res, 'Category added successfully!', doc);
            }, (err: any) => {
                error(req, res, pluCategoryErrs(err), null);
            }
        )
    } catch (err) {
        error(req, res, '', err)
    }
}


const get_categories = (req: Request, res: Response) => {
    try {
        let params = req.body;
        var query: any = {};
        params.name ? query['name'] = params.name : null;
        params._id ? query['_id'] = new ObjectId(`${params._id}`) : null;

        let getCategoriesWithPopulateSubCate = plu_categories.find(query);
        params.populate_sub_categories ? getCategoriesWithPopulateSubCate.populate('sub_categories') : null;
        getCategoriesWithPopulateSubCate.then((doc: any) => {
            if (doc) {
                success(req, res, "Category details!", doc);
            } else {
                error(req, res, "Category details doesn't exists!", "");
            }
        }, err => {
            error(req, res, '', err)
        })
    } catch (err) {
        error(req, res, '', err)
    }
}

const update_category = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        plu_categories.findOneAndUpdate(
            {
                _id: new ObjectId(`${params._id}`)
            },
            {
                $set: { name: params.name, description: params.description, sub_categories: params.sub_categories }
            }
        ).then(
            (udoc: any) => {
                if (!udoc) {
                    error(req, res, "Category doesn't exists!", null);
                } else {
                    success(req, res, "Category updated successfully!", {});
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

const delete_category = (req: Request, res: Response) => {
    try {
        let params = req.body;
        let query: any = { _id: new ObjectId(`${params._id}`) };
        plu_categories.findOneAndDelete(query).then(
            (doc: any) => {
                if (!doc) {
                    error(req, res, "Category doesn't exists!", "");
                } else {
                    success(req, res, "Category deleted successfully!", {});
                }
            }, err => {
                error(req, res, '', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}

// =================== Category end ====================== // 



// =================== Sub Category start ====================== //

const add_sub_category = async (req: Request, res: Response) => {
    try {
        let params = req.body;

        var inputdata = new plu_sub_categories(params)
        inputdata.save().then(
            (doc: any) => {
                success(req, res, 'Sub Category added successfully!', doc);
            }, (err: any) => {
                error(req, res, pluSubCategoryErrs(err), null);
            }
        )
    } catch (err) {
        error(req, res, '', err)
    }
}


const get_sub_categories = (req: Request, res: Response) => {
    try {
        let params = req.body;
        var query: any = {};
        params.name ? query['name'] = params.name : null;
        params._id ? query['_id'] = new ObjectId(`${params._id}`) : null;

        plu_sub_categories.find(query).then((doc: any) => {
            if (doc) {
                success(req, res, "Sub Category details!", doc);
            } else {
                error(req, res, "Sub Category details doesn't exists!", "");
            }
        }, err => {
            error(req, res, '', err)
        })
    } catch (err) {
        error(req, res, '', err)
    }
}

const update_sub_category = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        plu_sub_categories.findOneAndUpdate(
            {
                _id: new ObjectId(`${params._id}`)
            },
            {
                $set: { name: params.name, description: params.description }
            }
        ).then(
            (udoc: any) => {
                if (!udoc) {
                    error(req, res, "Sub Category doesn't exists!", null);
                } else {
                    success(req, res, "Sub Category updated successfully!", {});
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

const delete_sub_category = (req: Request, res: Response) => {
    try {
        let params = req.body;
        let query: any = { _id: new ObjectId(`${params._id}`) };
        plu_sub_categories.findOneAndDelete(query).then(
            (doc: any) => {
                if (!doc) {
                    error(req, res, "Sub Category doesn't exists!", "");
                } else {
                    success(req, res, "Sub Category deleted successfully!", {});
                }
            }, err => {
                error(req, res, '', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}

// =================== Sub Category end ====================== // 



export default {
    //categories
    add_category,
    get_categories,
    update_category,
    delete_category,

    //sub categories
    add_sub_category,
    get_sub_categories,
    update_sub_category,
    delete_sub_category

};

