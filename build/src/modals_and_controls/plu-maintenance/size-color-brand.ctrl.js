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
// =================== sizes start ====================== //
const add_size = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        var inputdata = new plu_schema_1.plu_sizes(params);
        inputdata.save().then((doc) => {
            (0, response_service_1.success)(req, res, 'Size Name added successfully!', doc);
        }, (err) => {
            (0, response_service_1.error)(req, res, (0, error_handler_service_1.pluSizeErrs)(err), null);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const get_sizes = (req, res) => {
    try {
        let params = req.body;
        var query = {};
        params.name ? query['name'] = params.name : null;
        params._id ? query['_id'] = new mongodb_1.ObjectId(`${params._id}`) : null;
        plu_schema_1.plu_sizes.find(query).then((doc) => {
            if (doc) {
                (0, response_service_1.success)(req, res, "Size details!", doc);
            }
            else {
                (0, response_service_1.error)(req, res, "Size details doesn't exists!", "");
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
const update_size = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        plu_schema_1.plu_sizes.findOneAndUpdate({
            _id: new mongodb_1.ObjectId(`${params._id}`)
        }, {
            $set: { name: params.name }
        }).then((udoc) => {
            if (!udoc) {
                (0, response_service_1.error)(req, res, "Size doesn't exists!", null);
            }
            else {
                (0, response_service_1.success)(req, res, "Size updated successfully!", {});
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const delete_size = (req, res) => {
    try {
        let params = req.body;
        let query = { _id: new mongodb_1.ObjectId(`${params._id}`) };
        plu_schema_1.plu_sizes.findOneAndDelete(query).then((doc) => {
            if (!doc) {
                (0, response_service_1.error)(req, res, "Size doesn't exists!", "");
            }
            else {
                (0, response_service_1.success)(req, res, "Size deleted successfully!", {});
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
// =================== sizes end ====================== // 
// =================== colors start ====================== //
const add_color = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        var inputdata = new plu_schema_1.plu_colors(params);
        inputdata.save().then((doc) => {
            (0, response_service_1.success)(req, res, 'Color Name added successfully!', doc);
        }, (err) => {
            (0, response_service_1.error)(req, res, (0, error_handler_service_1.pluColorErrs)(err), null);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const get_colors = (req, res) => {
    try {
        let params = req.body;
        var query = {};
        params.name ? query['name'] = params.name : null;
        params._id ? query['_id'] = new mongodb_1.ObjectId(`${params._id}`) : null;
        plu_schema_1.plu_colors.find(query).then((doc) => {
            if (doc) {
                (0, response_service_1.success)(req, res, "Color details!", doc);
            }
            else {
                (0, response_service_1.error)(req, res, "Color details doesn't exists!", "");
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
const update_color = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        plu_schema_1.plu_colors.findOneAndUpdate({
            _id: new mongodb_1.ObjectId(`${params._id}`)
        }, {
            $set: { name: params.name }
        }).then((udoc) => {
            if (!udoc) {
                (0, response_service_1.error)(req, res, "Color doesn't exists!", null);
            }
            else {
                (0, response_service_1.success)(req, res, "Color updated successfully!", {});
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const delete_color = (req, res) => {
    try {
        let params = req.body;
        let query = { _id: new mongodb_1.ObjectId(`${params._id}`) };
        plu_schema_1.plu_colors.findOneAndDelete(query).then((doc) => {
            if (!doc) {
                (0, response_service_1.error)(req, res, "Color doesn't exists!", "");
            }
            else {
                (0, response_service_1.success)(req, res, "Color deleted successfully!", {});
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
// =================== colors end ====================== // 
// =================== brands start ====================== //
const add_brand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        var inputdata = new plu_schema_1.plu_brands(params);
        inputdata.save().then((doc) => {
            (0, response_service_1.success)(req, res, 'Brand Name added successfully!', doc);
        }, (err) => {
            (0, response_service_1.error)(req, res, (0, error_handler_service_1.pluBrandErrs)(err), null);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const get_brands = (req, res) => {
    try {
        let params = req.body;
        var query = {};
        params.name ? query['name'] = params.name : null;
        params._id ? query['_id'] = new mongodb_1.ObjectId(`${params._id}`) : null;
        plu_schema_1.plu_brands.find(query).then((doc) => {
            if (doc) {
                (0, response_service_1.success)(req, res, "Brand details!", doc);
            }
            else {
                (0, response_service_1.error)(req, res, "Brand details doesn't exists!", "");
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
const update_brand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        plu_schema_1.plu_brands.findOneAndUpdate({
            _id: new mongodb_1.ObjectId(`${params._id}`)
        }, {
            $set: { name: params.name, description: params.description }
        }).then((udoc) => {
            if (!udoc) {
                (0, response_service_1.error)(req, res, "Brand doesn't exists!", null);
            }
            else {
                (0, response_service_1.success)(req, res, "Brand updated successfully!", {});
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const delete_brand = (req, res) => {
    try {
        let params = req.body;
        let query = { _id: new mongodb_1.ObjectId(`${params._id}`) };
        plu_schema_1.plu_brands.findOneAndDelete(query).then((doc) => {
            if (!doc) {
                (0, response_service_1.error)(req, res, "Brand doesn't exists!", "");
            }
            else {
                (0, response_service_1.success)(req, res, "Brand deleted successfully!", {});
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
// =================== brands end ====================== // 
exports.default = {
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
//# sourceMappingURL=size-color-brand.ctrl.js.map