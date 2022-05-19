import { plu_departments, plu_sub_departments } from './plu.schema';
import { Request, Response } from "express";
import { success, error } from '../../service/response.service';
import { ObjectId } from 'mongodb';
import { pluDepartmentErrs, pluSubDepartmentErrs } from '../../service/error-handler.service';


// =================== Department start ====================== //

const add_department = async (req: Request, res: Response) => {
    try {
        let params = req.body;

        var inputdata = new plu_departments(params)
        inputdata.save().then(
            (doc: any) => {
                success(req, res, 'Department added successfully!', doc);
            }, (err: any) => {
                error(req, res, pluDepartmentErrs(err), null);
            }
        )
    } catch (err) {
        error(req, res, '', err)
    }
}


const get_departments = (req: Request, res: Response) => {
    try {
        let params = req.body;
        var query: any = {};
        params.name ? query['name'] = params.name : null;
        params._id ? query['_id'] = new ObjectId(`${params._id}`) : null;

        let getDepartmentsWithPopulateSubDept = plu_departments.find(query);
        params.populate_sub_departments ? getDepartmentsWithPopulateSubDept.populate('sub_departments') : null;
        getDepartmentsWithPopulateSubDept.then((doc: any) => {
            if (doc) {
                success(req, res, "Department details!", doc);
            } else {
                error(req, res, "Department details doesn't exists!", "");
            }
        }, err => {
            error(req, res, '', err)
        })
    } catch (err) {
        error(req, res, '', err)
    }
}

const update_department = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        plu_departments.findOneAndUpdate(
            {
                _id: new ObjectId(`${params._id}`)
            },
            {
                $set: { name: params.name, description: params.description, sub_departments: params.sub_departments }
            }
        ).then(
            (udoc: any) => {
                if (!udoc) {
                    error(req, res, "Department doesn't exists!", null);
                } else {
                    success(req, res, "Department updated successfully!", {});
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

const delete_department = (req: Request, res: Response) => {
    try {
        let params = req.body;
        let query: any = { _id: new ObjectId(`${params._id}`) };
        plu_departments.findOneAndDelete(query).then(
            (doc: any) => {
                if (!doc) {
                    error(req, res, "Department doesn't exists!", "");
                } else {
                    success(req, res, "Department deleted successfully!", {});
                }
            }, err => {
                error(req, res, '', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}

// =================== Department end ====================== // 



// =================== Sub Department start ====================== //

const add_sub_department = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        var inputdata = new plu_sub_departments(params)
        inputdata.save().then(
            (doc: any) => {
                success(req, res, 'Sub Department added successfully!', doc);
            }, (err: any) => {
                error(req, res, pluSubDepartmentErrs(err), null);
            }
        )
    } catch (err) {
        error(req, res, '', err)
    }
}


const get_sub_departments = (req: Request, res: Response) => {
    try {
        let params = req.body;
        var query: any = {};
        params.name ? query['name'] = params.name : null;
        params._id ? query['_id'] = new ObjectId(`${params._id}`) : null;

        plu_sub_departments.find(query).then((doc: any) => {
            if (doc) {
                success(req, res, "Sub Department details!", doc);
            } else {
                error(req, res, "Sub Department details doesn't exists!", "");
            }
        }, err => {
            error(req, res, '', err)
        })
    } catch (err) {
        error(req, res, '', err)
    }
}

const update_sub_department = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        plu_sub_departments.findOneAndUpdate(
            {
                _id: new ObjectId(`${params._id}`)
            },
            {
                $set: { name: params.name, description: params.description }
            }
        ).then(
            (udoc: any) => {
                if (!udoc) {
                    error(req, res, "Sub Department doesn't exists!", null);
                } else {
                    success(req, res, "Sub Department updated successfully!", {});
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

const delete_sub_department = (req: Request, res: Response) => {
    try {
        let params = req.body;
        let query: any = { _id: new ObjectId(`${params._id}`) };
        plu_sub_departments.findOneAndDelete(query).then(
            (doc: any) => {
                if (!doc) {
                    error(req, res, "Sub Department doesn't exists!", "");
                } else {
                    success(req, res, "Sub Department deleted successfully!", {});
                }
            }, err => {
                error(req, res, '', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}

// =================== Sub Department end ====================== // 



export default {
    //departments
    add_department,
    get_departments,
    update_department,
    delete_department,

    //sub departments
    add_sub_department,
    get_sub_departments,
    update_sub_department,
    delete_sub_department

};

