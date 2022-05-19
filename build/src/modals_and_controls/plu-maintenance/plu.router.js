"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roots = express_1.default.Router();
const size_color_brand_ctrl_1 = __importDefault(require("./size-color-brand.ctrl"));
const category_subcategory_ctrl_1 = __importDefault(require("./category-subcategory.ctrl"));
const department_subdepartment_ctrl_1 = __importDefault(require("./department-subdepartment.ctrl"));
const master_files_ctrl_1 = __importDefault(require("./master-files.ctrl"));
//sizes
roots.post('/sizes/add', size_color_brand_ctrl_1.default.add_size);
roots.post('/sizes/get', size_color_brand_ctrl_1.default.get_sizes);
roots.post('/sizes/update', size_color_brand_ctrl_1.default.update_size);
roots.post('/sizes/delete', size_color_brand_ctrl_1.default.delete_size);
//colors
roots.post('/colors/add', size_color_brand_ctrl_1.default.add_color);
roots.post('/colors/get', size_color_brand_ctrl_1.default.get_colors);
roots.post('/colors/update', size_color_brand_ctrl_1.default.update_color);
roots.post('/colors/delete', size_color_brand_ctrl_1.default.delete_color);
//brands
roots.post('/brands/add', size_color_brand_ctrl_1.default.add_brand);
roots.post('/brands/get', size_color_brand_ctrl_1.default.get_brands);
roots.post('/brands/update', size_color_brand_ctrl_1.default.update_brand);
roots.post('/brands/delete', size_color_brand_ctrl_1.default.delete_brand);
//categories
roots.post('/categories/add', category_subcategory_ctrl_1.default.add_category);
roots.post('/categories/get', category_subcategory_ctrl_1.default.get_categories);
roots.post('/categories/update', category_subcategory_ctrl_1.default.update_category);
roots.post('/categories/delete', category_subcategory_ctrl_1.default.delete_category);
//sub-categories
roots.post('/sub-categories/add', category_subcategory_ctrl_1.default.add_sub_category);
roots.post('/sub-categories/get', category_subcategory_ctrl_1.default.get_sub_categories);
roots.post('/sub-categories/update', category_subcategory_ctrl_1.default.update_sub_category);
roots.post('/sub-categories/delete', category_subcategory_ctrl_1.default.delete_sub_category);
//departments
roots.post('/departments/add', department_subdepartment_ctrl_1.default.add_department);
roots.post('/departments/get', department_subdepartment_ctrl_1.default.get_departments);
roots.post('/departments/update', department_subdepartment_ctrl_1.default.update_department);
roots.post('/departments/delete', department_subdepartment_ctrl_1.default.delete_department);
//sub-departments
roots.post('/sub-departments/add', department_subdepartment_ctrl_1.default.add_sub_department);
roots.post('/sub-departments/get', department_subdepartment_ctrl_1.default.get_sub_departments);
roots.post('/sub-departments/update', department_subdepartment_ctrl_1.default.update_sub_department);
roots.post('/sub-departments/delete', department_subdepartment_ctrl_1.default.delete_sub_department);
// master files
roots.post('/master-files/add', master_files_ctrl_1.default.add_master_file);
roots.post('/master-files/get', master_files_ctrl_1.default.get_master_files);
roots.post('/master-files/update', master_files_ctrl_1.default.update_master_file);
roots.post('/master-files/delete', master_files_ctrl_1.default.delete_master_file);
exports.default = roots;
//# sourceMappingURL=plu.router.js.map