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
const error_handler_service_1 = require("../../service/error-handler.service");
// =================== Master start ====================== //
const add_master_file = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        var inputdata = new plu_schema_1.plu_master(params);
        inputdata.save().then((doc) => {
            (0, response_service_1.success)(req, res, 'PLU master file added successfully!', doc);
        }, (err) => {
            (0, response_service_1.error)(req, res, (0, error_handler_service_1.pluMasterErrs)(err), null);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const get_master_files = (req, res) => {
    try {
        let params = req.body;
        var query = {};
        params._id ? query['_id'] = new mongodb_1.ObjectId(`${params._id}`) : null;
        params.bracode ? query['bracode'] = params.bracode : null;
        params.name ? query['name'] = params.name : null;
        params.size ? query['size'] = new mongodb_1.ObjectId(`${params.size}`) : null;
        params.color ? query['color'] = new mongodb_1.ObjectId(`${params.color}`) : null;
        params.brand ? query['brand'] = new mongodb_1.ObjectId(`${params.brand}`) : null;
        params.category ? query['category'] = new mongodb_1.ObjectId(`${params.category}`) : null;
        params.sub_category ? query['sub_category'] = new mongodb_1.ObjectId(`${params.sub_category}`) : null;
        params.department ? query['department'] = new mongodb_1.ObjectId(`${params.department}`) : null;
        params.sub_department ? query['sub_department'] = new mongodb_1.ObjectId(`${params.sub_department}`) : null;
        params.between_dates ? query['discount_details.from_date'] = { $gte: new Date(params.between_dates.from_date) } : null;
        params.between_dates ? query['discount_details.to_date'] = { $gte: new Date(params.between_dates.to_date) } : null;
        let getMastersWithPopulate = plu_schema_1.plu_master.find(query);
        params.populate_size ? getMastersWithPopulate.populate('size') : null;
        params.populate_color ? getMastersWithPopulate.populate('color') : null;
        params.populate_brand ? getMastersWithPopulate.populate('brand') : null;
        params.populate_category ? getMastersWithPopulate.populate({
            path: 'category',
            populate: {
                path: 'sub_categories'
            },
        }) : null;
        params.populate_sub_category ? getMastersWithPopulate.populate('sub_category') : null;
        params.populate_department ? getMastersWithPopulate.populate({
            path: 'department',
            populate: {
                path: 'sub_departments'
            },
        }) : null;
        params.populate_sub_department ? getMastersWithPopulate.populate('sub_department') : null;
        getMastersWithPopulate.then((doc) => {
            if (doc) {
                (0, response_service_1.success)(req, res, "PLU master file details!", doc);
            }
            else {
                (0, response_service_1.error)(req, res, "PLU master file details doesn't exists!", "");
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
const update_master_file = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        let setQuery = {};
        params.bracode ? setQuery['bracode'] = params.bracode : null;
        params.name ? setQuery['name'] = params.name : null;
        params.description ? setQuery['description'] = params.description : null;
        params.size ? setQuery['size'] = new mongodb_1.ObjectId(`${params.size}`) : null;
        params.color ? setQuery['color'] = new mongodb_1.ObjectId(`${params.color}`) : null;
        params.brand ? setQuery['brand'] = new mongodb_1.ObjectId(`${params.brand}`) : null;
        params.category ? setQuery['category'] = new mongodb_1.ObjectId(`${params.category}`) : null;
        params.sub_category ? setQuery['sub_category'] = new mongodb_1.ObjectId(`${params.sub_category}`) : null;
        params.department ? setQuery['department'] = new mongodb_1.ObjectId(`${params.department}`) : null;
        params.sub_department ? setQuery['sub_department'] = new mongodb_1.ObjectId(`${params.sub_department}`) : null;
        params.discount_details ? setQuery['discount_details'] = params.discount_details : null;
        params.unit_price ? setQuery['unit_price'] = params.unit_price : null;
        params.tax ? setQuery['tax'] = params.tax : null;
        params.srp ? setQuery['srp'] = params.srp : null;
        params.expiration ? setQuery['expiration'] = params.expiration : null;
        params.images ? setQuery['images'] = params.images : null;
        setQuery['udate'] = new Date();
        plu_schema_1.plu_master.findOneAndUpdate({
            _id: new mongodb_1.ObjectId(`${params._id}`)
        }, {
            $set: setQuery
        }).then((udoc) => {
            if (!udoc) {
                (0, response_service_1.error)(req, res, "PLU master file doesn't exists!", null);
            }
            else {
                (0, response_service_1.success)(req, res, "PLU master file updated successfully!", {});
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const delete_master_file = (req, res) => {
    try {
        let params = req.body;
        let query = { _id: new mongodb_1.ObjectId(`${params._id}`) };
        plu_schema_1.plu_master.findOneAndDelete(query).then((doc) => {
            if (!doc) {
                (0, response_service_1.error)(req, res, "PLU master file doesn't exists!", "");
            }
            else {
                (0, response_service_1.success)(req, res, "PLU master file deleted successfully!", {});
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
// =================== Master end ====================== // 
exports.default = {
    add_master_file,
    get_master_files,
    update_master_file,
    delete_master_file
};
//# sourceMappingURL=master-files.ctrl.js.map