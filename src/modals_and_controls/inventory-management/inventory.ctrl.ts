import { inventory, inventory_purpose } from './inventory.schema';
import { Request, Response } from "express";
import { success, error } from '../../service/response.service';
import { ObjectId } from 'mongodb';
import { inventoryPurposeErrs, inventoryErrs } from '../../service/error-handler.service';


// =================== Inventory start ====================== //

const add_inventory = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        const inputdata = new inventory(params)
        inputdata.save().then(
            (doc: any) => {
                success(req, res, 'Inventory added successfully!', doc);
            }, (err: any) => {
                error(req, res, inventoryErrs(err), null);
            }
        )
    } catch (err) {
        error(req, res, '', err)
    }
}

const get_inventory = (req: Request, res: Response) => {
    try {
        let params = req.body;
        var query: any = {};
        params.incomming_number ? query['incomming_number'] = params.incomming_number : null;
        params._id ? query['_id'] = new ObjectId(`${params._id}`) : null;

        let getInventory = inventory.find(query);

        params.populate_concert ? getInventory.populate({
            path: 'concert',
            populate: ["performers", "venues", "main_artist", "genre", "community"]
        }) : null;
        params.populate_purpose ? getInventory.populate('purpose') : null;
        params.populate_plu ? getInventory.populate({
            path: 'plu_maintenance.plu_master',
            populate: ["size", "color", "brand", "category", "sub_category", "department", "sub_department"]
        }) : null;

        getInventory.then((doc: any) => {
            if (doc) {
                success(req, res, "Inventory details!", doc);
            } else {
                error(req, res, "Inventory details doesn't exists!", "");
            }
        }, err => {
            error(req, res, '', err)
        })
    } catch (err) {
        error(req, res, '', err)
    }
}

const update_inventory = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        let setQuery: any = {};

        params.concert ? setQuery['concert'] = new ObjectId(`${params.concert}`) : null;
        params.inventory_date ? setQuery['inventory_date'] = params.inventory_date : null;
        params.purpose ? setQuery['purpose'] = new ObjectId(`${params.purpose}`) : null;

        params.reference_number ? setQuery['reference_number'] = params.reference_number : null;
        params.remarks ? setQuery['remarks'] = params.remarks : null;
        params.plu_maintenance ? setQuery['plu_maintenance'] = params.plu_maintenance : null;

        setQuery['udate'] = Date.now();

        inventory.findOneAndUpdate(
            {
                _id: new ObjectId(`${params._id}`)
            },
            {
                $set: setQuery
            }
        ).then(
            (udoc: any) => {
                if (!udoc) {
                    error(req, res, "Inventory doesn't exists!", null);
                } else {
                    success(req, res, "Inventory updated successfully!", {});
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

const delete_inventory = (req: Request, res: Response) => {
    try {
        let params = req.body;
        let query: any = { _id: new ObjectId(`${params._id}`) };
        inventory.findOneAndDelete(query).then(
            (doc: any) => {
                if (!doc) {
                    error(req, res, "Inventory doesn't exists!", "");
                } else {
                    success(req, res, "Inventory deleted successfully!", {});
                }
            }, err => {
                error(req, res, '', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}

// =================== Inventory end ====================== // 



// =================== Inventory Purpose start ====================== //

const add_inventory_purpose = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        var inputdata = new inventory_purpose(params)
        inputdata.save().then(
            (doc: any) => {
                success(req, res, 'Inventory purpose added successfully!', doc);
            }, (err: any) => {
                error(req, res, inventoryPurposeErrs(err), null);
            }
        )
    } catch (err) {
        error(req, res, '', err)
    }
}


const get_inventory_purpose = (req: Request, res: Response) => {
    try {
        let params = req.body;
        var query: any = {};
        params.name ? query['name'] = params.name : null;
        params._id ? query['_id'] = new ObjectId(`${params._id}`) : null;

        inventory_purpose.find(query).then((doc: any) => {
            if (doc) {
                success(req, res, "Inventory purpose details!", doc);
            } else {
                error(req, res, "Inventory purpose details doesn't exists!", "");
            }
        }, err => {
            error(req, res, '', err)
        })
    } catch (err) {
        error(req, res, '', err)
    }
}

const update_inventory_purpose = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        inventory_purpose.findOneAndUpdate(
            {
                _id: new ObjectId(`${params._id}`)
            },
            {
                $set: { name: params.name }
            }
        ).then(
            (udoc: any) => {
                if (!udoc) {
                    error(req, res, "Inventory purpose doesn't exists!", null);
                } else {
                    success(req, res, "Inventory purpose updated successfully!", {});
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

const delete_inventory_purpose = (req: Request, res: Response) => {
    try {
        let params = req.body;
        let query: any = { _id: new ObjectId(`${params._id}`) };
        inventory_purpose.findOneAndDelete(query).then(
            (doc: any) => {
                if (!doc) {
                    error(req, res, "Inventory purpose doesn't exists!", "");
                } else {
                    success(req, res, "Inventory purpose deleted successfully!", {});
                }
            }, err => {
                error(req, res, '', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}

// =================== Inventory purpose end ====================== // 



export default {

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

