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
const plu_schema_1 = require("./plu.schema");
const response_service_1 = require("../../service/response.service");
const mongodb_1 = require("mongodb");
const error_handler_service_1 = require("src/service/error-handler.service");
// =================== Department start ====================== //
const add_department = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        var inputdata = new plu_schema_1.plu_departments(params);
        inputdata.save().then((doc) => {
            (0, response_service_1.success)(req, res, 'Department added successfully!', doc);
        }, (err) => {
            (0, response_service_1.error)(req, res, (0, error_handler_service_1.pluDepartmentErrs)(err), err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const get_departments = (req, res) => {
    try {
        let params = req.body;
        var query = {};
        params.name ? query['name'] = params.name : null;
        params._id ? query['_id'] = new mongodb_1.ObjectId(`${params._id}`) : null;
        let getDepartmentsWithPopulateSubDept = plu_schema_1.plu_departments.find(query);
        params.populate_sub_departments ? getDepartmentsWithPopulateSubDept.populate('sub_departments') : null;
        getDepartmentsWithPopulateSubDept.then((doc) => {
            if (doc) {
                (0, response_service_1.success)(req, res, "Department details!", doc);
            }
            else {
                (0, response_service_1.error)(req, res, "Department details doesn't exists!", "");
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
const update_department = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        plu_schema_1.plu_departments.findOneAndUpdate({
            _id: new mongodb_1.ObjectId(`${params._id}`)
        }, {
            $set: { name: params.name, description: params.description, sub_departments: params.sub_departments }
        }).then((udoc) => {
            if (!udoc) {
                (0, response_service_1.error)(req, res, "Department doesn't exists!", null);
            }
            else {
                (0, response_service_1.success)(req, res, "Department updated successfully!", {});
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const delete_department = (req, res) => {
    try {
        let params = req.body;
        let query = { _id: new mongodb_1.ObjectId(`${params._id}`) };
        plu_schema_1.plu_departments.findOneAndDelete(query).then((doc) => {
            if (!doc) {
                (0, response_service_1.error)(req, res, "Department doesn't exists!", "");
            }
            else {
                (0, response_service_1.success)(req, res, "Department deleted successfully!", {});
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
// =================== Department end ====================== // 
// =================== Sub Department start ====================== //
const add_sub_department = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        var inputdata = new plu_schema_1.plu_sub_departments(params);
        inputdata.save().then((doc) => {
            (0, response_service_1.success)(req, res, 'Sub Department added successfully!', doc);
        }, (err) => {
            (0, response_service_1.error)(req, res, (0, error_handler_service_1.pluSubDepartmentErrs)(err), err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const get_sub_departments = (req, res) => {
    try {
        let params = req.body;
        var query = {};
        params.name ? query['name'] = params.name : null;
        params._id ? query['_id'] = new mongodb_1.ObjectId(`${params._id}`) : null;
        plu_schema_1.plu_sub_departments.find(query).then((doc) => {
            if (doc) {
                (0, response_service_1.success)(req, res, "Sub Department details!", doc);
            }
            else {
                (0, response_service_1.error)(req, res, "Sub Department details doesn't exists!", "");
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
const update_sub_department = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        plu_schema_1.plu_sub_departments.findOneAndUpdate({
            _id: new mongodb_1.ObjectId(`${params._id}`)
        }, {
            $set: { name: params.name, description: params.description }
        }).then((udoc) => {
            if (!udoc) {
                (0, response_service_1.error)(req, res, "Sub Department doesn't exists!", null);
            }
            else {
                (0, response_service_1.success)(req, res, "Sub Department updated successfully!", {});
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const delete_sub_department = (req, res) => {
    try {
        let params = req.body;
        let query = { _id: new mongodb_1.ObjectId(`${params._id}`) };
        plu_schema_1.plu_sub_departments.findOneAndDelete(query).then((doc) => {
            if (!doc) {
                (0, response_service_1.error)(req, res, "Sub Department doesn't exists!", "");
            }
            else {
                (0, response_service_1.success)(req, res, "Sub Department deleted successfully!", {});
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
// =================== Sub Department end ====================== // 
exports.default = {
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
//# sourceMappingURL=department-subdepartment.ctrl.js.map