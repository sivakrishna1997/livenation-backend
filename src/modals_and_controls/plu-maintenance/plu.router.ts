import express from 'express';
const roots = express.Router();

import size_color_brand from './size-color-brand.ctrl';
import categories from './category-subcategory.ctrl';
import departments from './department-subdepartment.ctrl';
import master_files from './master-files.ctrl';

//sizes
roots.post('/sizes/add', size_color_brand.add_size);
roots.post('/sizes/get', size_color_brand.get_sizes);
roots.post('/sizes/update', size_color_brand.update_size);
roots.post('/sizes/delete', size_color_brand.delete_size);

//colors
roots.post('/colors/add', size_color_brand.add_color);
roots.post('/colors/get', size_color_brand.get_colors);
roots.post('/colors/update', size_color_brand.update_color);
roots.post('/colors/delete', size_color_brand.delete_color);

//brands
roots.post('/brands/add', size_color_brand.add_brand);
roots.post('/brands/get', size_color_brand.get_brands);
roots.post('/brands/update', size_color_brand.update_brand);
roots.post('/brands/delete', size_color_brand.delete_brand);

//categories
roots.post('/categories/add', categories.add_category);
roots.post('/categories/get', categories.get_categories);
roots.post('/categories/update', categories.update_category);
roots.post('/categories/delete', categories.delete_category);

//sub-categories
roots.post('/sub-categories/add', categories.add_sub_category);
roots.post('/sub-categories/get', categories.get_sub_categories);
roots.post('/sub-categories/update', categories.update_sub_category);
roots.post('/sub-categories/delete', categories.delete_sub_category);

//departments
roots.post('/departments/add', departments.add_department);
roots.post('/departments/get', departments.get_departments);
roots.post('/departments/update', departments.update_department);
roots.post('/departments/delete', departments.delete_department);

//sub-departments
roots.post('/sub-departments/add', departments.add_sub_department);
roots.post('/sub-departments/get', departments.get_sub_departments);
roots.post('/sub-departments/update', departments.update_sub_department);
roots.post('/sub-departments/delete', departments.delete_sub_department);

// master files
roots.post('/master-files/add', master_files.add_master_file);
roots.post('/master-files/get', master_files.get_master_files);
roots.post('/master-files/update', master_files.update_master_file);
roots.post('/master-files/delete', master_files.delete_master_file);



export default roots;
