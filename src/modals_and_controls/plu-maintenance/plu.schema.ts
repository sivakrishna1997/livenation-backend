import * as mongoose from 'mongoose';

export const plu_master = mongoose.model('plu_master', new mongoose.Schema({
    bracode: { type: String, required: [true, "Brand Code is required"], trim: true, unique: true },
    name: { type: String, required: [true, "Master Name is required"], trim: true, index: true },
    description: { type: String },

    size: { type: mongoose.Schema.Types.ObjectId, ref: 'plu_sizes', required: [true, "Size is required"] },
    color: { type: mongoose.Schema.Types.ObjectId, ref: 'plu_colors', required: [true, "Color is required"] },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'plu_brands', required: [true, "Brand is required"] },

    category: { type: mongoose.Schema.Types.ObjectId, ref: 'plu_categories', required: [true, "Category is required"] },
    sub_category: { type: mongoose.Schema.Types.ObjectId, ref: 'plu_sub_categories', required: [true, "Sub Category is required"] },

    department: { type: mongoose.Schema.Types.ObjectId, ref: 'plu_departments', required: [true, "Department is required"] },
    sub_department: { type: mongoose.Schema.Types.ObjectId, ref: 'plu_sub_departments', required: [true, "Sub Department is required"] },

    unit_price: { type: Number, required: [true, "Unit Price is required"] },
    tax: { type: Number, required: [true, "Tax is required"] },
    srp: { type: Number, required: [true, "SRP is required"] },
    expiration: { type: Date, required: [true, "Expiration is required"] },

    discount_details: {
        from_date: { type: Date, required: [true, "Discount From Date is required"] },
        to_date: { type: Date, required: [true, "Discount To Date is required"] },
        discount: { type: Number, required: [true, "Discount is required"] },
        vip_discount: { type: Number, required: [true, "VIP Discount is required"] },
    },

    images: [{ type: String }],

    cdate: { type: Date },
    udate: { type: Date }
})
)



export const plu_colors = mongoose.model('plu_colors', new mongoose.Schema({
    name: { type: String, required: [true, "Color Name is required"], trim: true, unique: true }
}))

export const plu_sizes = mongoose.model('plu_sizes', new mongoose.Schema({
    name: { type: String, required: [true, "Size Name is required"], trim: true, unique: true }
}))

export const plu_brands = mongoose.model('plu_brands', new mongoose.Schema({
    name: { type: String, required: [true, "Brand Name is required"], trim: true, unique: true },
    description: { type: String }
}))

export const plu_categories = mongoose.model('plu_categories', new mongoose.Schema({
    name: { type: String, required: [true, "Category Name is required"], trim: true, unique: true },
    description: { type: String },
    sub_categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "plu_sub_categories" }]
}))

export const plu_sub_categories = mongoose.model('plu_sub_categories', new mongoose.Schema({
    name: { type: String, required: [true, "Sub Category Name is required"], trim: true, unique: true },
    description: { type: String }
}))

export const plu_departments = mongoose.model('plu_departments', new mongoose.Schema({
    name: { type: String, required: [true, "Department Name is required"], trim: true, unique: true },
    description: { type: String },
    sub_departments: [{ type: mongoose.Schema.Types.ObjectId, ref: "plu_sub_departments" }]
}))

export const plu_sub_departments = mongoose.model('plu_sub_departments', new mongoose.Schema({
    name: { type: String, required: [true, "Sub Department Name is required"], trim: true, unique: true },
    description: { type: String }
}))
