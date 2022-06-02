import * as express from 'express';
const inventory = express.Router();
import inventoryCtrl from './inventory.ctrl'


//Inventory
inventory.post('/add', inventoryCtrl.add_inventory);
inventory.post('/get', inventoryCtrl.get_inventory);
inventory.post('/update', inventoryCtrl.update_inventory);
inventory.post('/delete', inventoryCtrl.delete_inventory);


//Inventory Purpose
inventory.post('/purpose/add', inventoryCtrl.add_inventory_purpose);
inventory.post('/purpose/get', inventoryCtrl.get_inventory_purpose);
inventory.post('/purpose/update', inventoryCtrl.update_inventory_purpose);
inventory.post('/purpose/delete', inventoryCtrl.delete_inventory_purpose);


export default inventory;
