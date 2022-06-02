"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryErrs = exports.inventoryPurposeErrs = exports.pluMasterErrs = exports.pluSubDepartmentErrs = exports.pluDepartmentErrs = exports.pluSubCategoryErrs = exports.pluCategoryErrs = exports.pluBrandErrs = exports.pluSizeErrs = exports.pluColorErrs = exports.stageErrs = exports.venueErrs = exports.genreErrs = exports.communityErrs = exports.artistErrs = exports.userErrs = void 0;
const userErrs = (error) => {
    var _a, _b, _c;
    let err_msg = '';
    if (((_a = error.keyValue) === null || _a === void 0 ? void 0 : _a.username) != null && error.name === "MongoError" && error.code === 11000) {
        err_msg = "User Name already exist";
    }
    else if (((_b = error.keyValue) === null || _b === void 0 ? void 0 : _b.email) != null && error.name === "MongoError" && error.code === 11000) {
        err_msg = "Email already exist";
    }
    else if (((_c = error.keyValue) === null || _c === void 0 ? void 0 : _c.mobile) != null && error.name === "MongoError" && error.code === 11000) {
        err_msg = "Mobile Number already exist";
    }
    else {
        err_msg = error.message;
    }
    return err_msg;
};
exports.userErrs = userErrs;
const artistErrs = (error) => {
    var _a;
    let err_msg = '';
    if (((_a = error.keyValue) === null || _a === void 0 ? void 0 : _a.name) != null && error.name === "MongoError" && error.code === 11000) {
        err_msg = "Artist Name already exist";
    }
    else {
        err_msg = error.message;
    }
    return err_msg;
};
exports.artistErrs = artistErrs;
const communityErrs = (error) => {
    var _a;
    let err_msg = '';
    if (((_a = error.keyValue) === null || _a === void 0 ? void 0 : _a.name) != null && error.name === "MongoError" && error.code === 11000) {
        err_msg = "Community Name already exist";
    }
    else {
        err_msg = error.message;
    }
    return err_msg;
};
exports.communityErrs = communityErrs;
const genreErrs = (error) => {
    var _a;
    let err_msg = '';
    if (((_a = error.keyValue) === null || _a === void 0 ? void 0 : _a.name) != null && error.name === "MongoError" && error.code === 11000) {
        err_msg = "Genre Name already exist";
    }
    else {
        err_msg = error.message;
    }
    return err_msg;
};
exports.genreErrs = genreErrs;
const venueErrs = (error) => {
    let err_msg = '';
    if (error.keyValue.name != null && error.name === "MongoError" && error.code === 11000) {
        err_msg = "Venue Name already exist";
    }
    else {
        err_msg = error.message;
    }
    return err_msg;
};
exports.venueErrs = venueErrs;
const stageErrs = (error) => {
    var _a;
    let err_msg = '';
    if (((_a = error.keyValue) === null || _a === void 0 ? void 0 : _a.name) != null && error.name === "MongoError" && error.code === 11000) {
        err_msg = "Stage Name already exist";
    }
    else {
        err_msg = error.message;
    }
    return err_msg;
};
exports.stageErrs = stageErrs;
const pluColorErrs = (error) => {
    var _a;
    let err_msg = '';
    if (((_a = error.keyValue) === null || _a === void 0 ? void 0 : _a.name) != null && error.name === "MongoError" && error.code === 11000) {
        err_msg = "Color Name already exist";
    }
    else {
        err_msg = error.message;
    }
    return err_msg;
};
exports.pluColorErrs = pluColorErrs;
const pluSizeErrs = (error) => {
    var _a;
    let err_msg = '';
    if (((_a = error.keyValue) === null || _a === void 0 ? void 0 : _a.name) != null && error.name === "MongoError" && error.code === 11000) {
        err_msg = "Size Name already exist";
    }
    else {
        err_msg = error.message;
    }
    return err_msg;
};
exports.pluSizeErrs = pluSizeErrs;
const pluBrandErrs = (error) => {
    var _a;
    let err_msg = '';
    if (((_a = error.keyValue) === null || _a === void 0 ? void 0 : _a.name) != null && error.name === "MongoError" && error.code === 11000) {
        err_msg = "Brand Name already exist";
    }
    else {
        err_msg = error.message;
    }
    return err_msg;
};
exports.pluBrandErrs = pluBrandErrs;
const pluCategoryErrs = (error) => {
    var _a;
    let err_msg = '';
    if (((_a = error.keyValue) === null || _a === void 0 ? void 0 : _a.name) != null && error.name === "MongoError" && error.code === 11000) {
        err_msg = "Category Name already exist";
    }
    else {
        err_msg = error.message;
    }
    return err_msg;
};
exports.pluCategoryErrs = pluCategoryErrs;
const pluSubCategoryErrs = (error) => {
    var _a;
    let err_msg = '';
    if (((_a = error.keyValue) === null || _a === void 0 ? void 0 : _a.name) != null && error.name === "MongoError" && error.code === 11000) {
        err_msg = "Sub Category Name already exist";
    }
    else {
        err_msg = error.message;
    }
    return err_msg;
};
exports.pluSubCategoryErrs = pluSubCategoryErrs;
const pluDepartmentErrs = (error) => {
    var _a;
    let err_msg = '';
    if (((_a = error.keyValue) === null || _a === void 0 ? void 0 : _a.name) != null && error.name === "MongoError" && error.code === 11000) {
        err_msg = "Department Name already exist";
    }
    else {
        err_msg = error.message;
    }
    return err_msg;
};
exports.pluDepartmentErrs = pluDepartmentErrs;
const pluSubDepartmentErrs = (error) => {
    var _a;
    let err_msg = '';
    if (((_a = error.keyValue) === null || _a === void 0 ? void 0 : _a.name) != null && error.name === "MongoError" && error.code === 11000) {
        err_msg = "Sub Department Name already exist";
    }
    else {
        err_msg = error.message;
    }
    return err_msg;
};
exports.pluSubDepartmentErrs = pluSubDepartmentErrs;
const pluMasterErrs = (error) => {
    var _a;
    let err_msg = '';
    if (((_a = error.keyValue) === null || _a === void 0 ? void 0 : _a.bracode) != null && error.name === "MongoError" && error.code === 11000) {
        err_msg = "Barcode already exist";
    }
    else {
        err_msg = error.message;
    }
    return err_msg;
};
exports.pluMasterErrs = pluMasterErrs;
const inventoryPurposeErrs = (error) => {
    var _a;
    let err_msg = '';
    if (((_a = error.keyValue) === null || _a === void 0 ? void 0 : _a.name) != null && error.name === "MongoError" && error.code === 11000) {
        err_msg = "Purpose Name already exist";
    }
    else {
        err_msg = error.message;
    }
    return err_msg;
};
exports.inventoryPurposeErrs = inventoryPurposeErrs;
const inventoryErrs = (error) => {
    var _a;
    debugger;
    let err_msg = '';
    if (((_a = error.keyValue) === null || _a === void 0 ? void 0 : _a.incomming_number) != null && error.name === "MongoError" && error.code === 11000) {
        err_msg = "Inventory incomming number already exist";
    }
    else {
        err_msg = error.message;
    }
    return err_msg;
};
exports.inventoryErrs = inventoryErrs;
//# sourceMappingURL=error-handler.service.js.map