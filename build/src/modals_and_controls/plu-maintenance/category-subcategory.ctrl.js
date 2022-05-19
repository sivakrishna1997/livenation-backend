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
// =================== Category start ====================== //
const add_category = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        var inputdata = new plu_schema_1.plu_categories(params);
        inputdata.save().then((doc) => {
            (0, response_service_1.success)(req, res, 'Category added successfully!', doc);
        }, (err) => {
            (0, response_service_1.error)(req, res, (0, error_handler_service_1.pluCategoryErrs)(err), err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const get_categories = (req, res) => {
    try {
        let params = req.body;
        var query = {};
        params.name ? query['name'] = params.name : null;
        params._id ? query['_id'] = new mongodb_1.ObjectId(`${params._id}`) : null;
        let getCategoriesWithPopulateSubCate = plu_schema_1.plu_categories.find(query);
        params.populate_sub_categories ? getCategoriesWithPopulateSubCate.populate('sub_categories') : null;
        getCategoriesWithPopulateSubCate.then((doc) => {
            if (doc) {
                (0, response_service_1.success)(req, res, "Category details!", doc);
            }
            else {
                (0, response_service_1.error)(req, res, "Category details doesn't exists!", "");
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
const update_category = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        plu_schema_1.plu_categories.findOneAndUpdate({
            _id: new mongodb_1.ObjectId(`${params._id}`)
        }, {
            $set: { name: params.name, description: params.description, sub_categories: params.sub_categories }
        }).then((udoc) => {
            if (!udoc) {
                (0, response_service_1.error)(req, res, "Category doesn't exists!", null);
            }
            else {
                (0, response_service_1.success)(req, res, "Category updated successfully!", {});
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const delete_category = (req, res) => {
    try {
        let params = req.body;
        let query = { _id: new mongodb_1.ObjectId(`${params._id}`) };
        plu_schema_1.plu_categories.findOneAndDelete(query).then((doc) => {
            if (!doc) {
                (0, response_service_1.error)(req, res, "Category doesn't exists!", "");
            }
            else {
                (0, response_service_1.success)(req, res, "Category deleted successfully!", {});
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
// =================== Category end ====================== // 
// =================== Sub Category start ====================== //
const add_sub_category = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        var inputdata = new plu_schema_1.plu_sub_categories(params);
        inputdata.save().then((doc) => {
            (0, response_service_1.success)(req, res, 'Sub Category added successfully!', doc);
        }, (err) => {
            (0, response_service_1.error)(req, res, (0, error_handler_service_1.pluSubCategoryErrs)(err), err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const get_sub_categories = (req, res) => {
    try {
        let params = req.body;
        var query = {};
        params.name ? query['name'] = params.name : null;
        params._id ? query['_id'] = new mongodb_1.ObjectId(`${params._id}`) : null;
        plu_schema_1.plu_sub_categories.find(query).then((doc) => {
            if (doc) {
                (0, response_service_1.success)(req, res, "Sub Category details!", doc);
            }
            else {
                (0, response_service_1.error)(req, res, "Sub Category details doesn't exists!", "");
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
const update_sub_category = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        plu_schema_1.plu_sub_categories.findOneAndUpdate({
            _id: new mongodb_1.ObjectId(`${params._id}`)
        }, {
            $set: { name: params.name, description: params.description }
        }).then((udoc) => {
            if (!udoc) {
                (0, response_service_1.error)(req, res, "Sub Category doesn't exists!", null);
            }
            else {
                (0, response_service_1.success)(req, res, "Sub Category updated successfully!", {});
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const delete_sub_category = (req, res) => {
    try {
        let params = req.body;
        let query = { _id: new mongodb_1.ObjectId(`${params._id}`) };
        plu_schema_1.plu_sub_categories.findOneAndDelete(query).then((doc) => {
            if (!doc) {
                (0, response_service_1.error)(req, res, "Sub Category doesn't exists!", "");
            }
            else {
                (0, response_service_1.success)(req, res, "Sub Category deleted successfully!", {});
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
// =================== Sub Category end ====================== // 
exports.default = {
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
//# sourceMappingURL=category-subcategory.ctrl.js.map