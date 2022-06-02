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
const inventory_schema_1 = require("./inventory.schema");
const response_service_1 = require("../../service/response.service");
const mongodb_1 = require("mongodb");
const error_handler_service_1 = require("../../service/error-handler.service");
// =================== Inventory start ====================== //
const add_inventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        const inputdata = new inventory_schema_1.inventory(params);
        inputdata.save().then((doc) => {
            (0, response_service_1.success)(req, res, 'Inventory added successfully!', doc);
        }, (err) => {
            (0, response_service_1.error)(req, res, (0, error_handler_service_1.inventoryErrs)(err), null);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const get_inventory = (req, res) => {
    try {
        let params = req.body;
        var query = {};
        params.incomming_number ? query['incomming_number'] = params.incomming_number : null;
        params._id ? query['_id'] = new mongodb_1.ObjectId(`${params._id}`) : null;
        let getInventory = inventory_schema_1.inventory.find(query);
        params.populate_concert ? getInventory.populate({
            path: 'concert',
            populate: ["performers", "venues", "main_artist", "genre", "community"]
        }) : null;
        params.populate_purpose ? getInventory.populate('purpose') : null;
        params.populate_plu ? getInventory.populate({
            path: 'plu_maintenance.plu_master',
            populate: ["size", "color", "brand", "category", "sub_category", "department", "sub_department"]
        }) : null;
        getInventory.then((doc) => {
            if (doc) {
                (0, response_service_1.success)(req, res, "Inventory details!", doc);
            }
            else {
                (0, response_service_1.error)(req, res, "Inventory details doesn't exists!", "");
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
const update_inventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        let setQuery = {};
        params.concert ? setQuery['concert'] = new mongodb_1.ObjectId(`${params.concert}`) : null;
        params.inventory_date ? setQuery['inventory_date'] = params.inventory_date : null;
        params.purpose ? setQuery['purpose'] = new mongodb_1.ObjectId(`${params.purpose}`) : null;
        params.reference_number ? setQuery['reference_number'] = params.reference_number : null;
        params.remarks ? setQuery['remarks'] = params.remarks : null;
        params.plu_maintenance ? setQuery['plu_maintenance'] = params.plu_maintenance : null;
        setQuery['udate'] = Date.now();
        inventory_schema_1.inventory.findOneAndUpdate({
            _id: new mongodb_1.ObjectId(`${params._id}`)
        }, {
            $set: setQuery
        }).then((udoc) => {
            if (!udoc) {
                (0, response_service_1.error)(req, res, "Inventory doesn't exists!", null);
            }
            else {
                (0, response_service_1.success)(req, res, "Inventory updated successfully!", {});
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const delete_inventory = (req, res) => {
    try {
        let params = req.body;
        let query = { _id: new mongodb_1.ObjectId(`${params._id}`) };
        inventory_schema_1.inventory.findOneAndDelete(query).then((doc) => {
            if (!doc) {
                (0, response_service_1.error)(req, res, "Inventory doesn't exists!", "");
            }
            else {
                (0, response_service_1.success)(req, res, "Inventory deleted successfully!", {});
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
// =================== Inventory end ====================== // 
// =================== Inventory Purpose start ====================== //
const add_inventory_purpose = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        var inputdata = new inventory_schema_1.inventory_purpose(params);
        inputdata.save().then((doc) => {
            (0, response_service_1.success)(req, res, 'Inventory purpose added successfully!', doc);
        }, (err) => {
            (0, response_service_1.error)(req, res, (0, error_handler_service_1.inventoryPurposeErrs)(err), null);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const get_inventory_purpose = (req, res) => {
    try {
        let params = req.body;
        var query = {};
        params.name ? query['name'] = params.name : null;
        params._id ? query['_id'] = new mongodb_1.ObjectId(`${params._id}`) : null;
        inventory_schema_1.inventory_purpose.find(query).then((doc) => {
            if (doc) {
                (0, response_service_1.success)(req, res, "Inventory purpose details!", doc);
            }
            else {
                (0, response_service_1.error)(req, res, "Inventory purpose details doesn't exists!", "");
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
const update_inventory_purpose = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        inventory_schema_1.inventory_purpose.findOneAndUpdate({
            _id: new mongodb_1.ObjectId(`${params._id}`)
        }, {
            $set: { name: params.name }
        }).then((udoc) => {
            if (!udoc) {
                (0, response_service_1.error)(req, res, "Inventory purpose doesn't exists!", null);
            }
            else {
                (0, response_service_1.success)(req, res, "Inventory purpose updated successfully!", {});
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const delete_inventory_purpose = (req, res) => {
    try {
        let params = req.body;
        let query = { _id: new mongodb_1.ObjectId(`${params._id}`) };
        inventory_schema_1.inventory_purpose.findOneAndDelete(query).then((doc) => {
            if (!doc) {
                (0, response_service_1.error)(req, res, "Inventory purpose doesn't exists!", "");
            }
            else {
                (0, response_service_1.success)(req, res, "Inventory purpose deleted successfully!", {});
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
// =================== Inventory purpose end ====================== // 
exports.default = {
    //inventory
    add_inventory,
    get_inventory,
    update_inventory,
    delete_inventory,
    //inventory purpose
    add_inventory_purpose,
    get_inventory_purpose,
    update_inventory_purpose,
    delete_inventory_purpose
};
//# sourceMappingURL=inventory.ctrl.js.map