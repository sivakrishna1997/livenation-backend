import * as mongoose from 'mongoose';

export const plu_master = mongoose.model('plu_master', new mongoose.Schema({
    bracode: { type: String, required: true, trim: true, unique: true },
    name: { type: String, required: true, trim: true, index: true },
    description: { type: String },

    size: { type: mongoose.Schema.Types.ObjectId, ref: 'plu_sizes', required: true },
    color: { type: mongoose.Schema.Types.ObjectId, ref: 'plu_colors', required: true },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'plu_brands', required: true },

    category: { type: mongoose.Schema.Types.ObjectId, ref: 'plu_categories', required: true },
    sub_category: { type: mongoose.Schema.Types.ObjectId, ref: 'plu_sub_categories', required: true },

    department: { type: mongoose.Schema.Types.ObjectId, ref: 'plu_departments', required: true },
    sub_department: { type: mongoose.Schema.Types.ObjectId, ref: 'plu_sub_departments', required: true },

    unit_price: { type: Number, required: true },
    tax: { type: Number, required: true },
    srp: { type: Number, required: true },
    expiration: { type: Date, required: true },

    discount_details: {
        from_date: { type: Date, required: true },
        to_date: { type: Date, required: true },
        discount: { type: Number, required: true },
        vip_discount: { type: Number, required: true },
    },

    images: [{ type: String }],

    cdate: { type: Date },
    udate: { type: Date }
})
)


export const plu_colors = mongoose.model('plu_colors', new mongoose.Schema({
    name: { type: String, required: true, trim: true, unique: true }
}))

export const plu_sizes = mongoose.model('plu_sizes', new mongoose.Schema({
    name: { type: String, required: true, trim: true, unique: true }
}))

export const plu_brands = mongoose.model('plu_brands', new mongoose.Schema({
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String }
}))

export const plu_categories = mongoose.model('plu_categories', new mongoose.Schema({
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String },
    sub_categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "plu_sub_categories" }]
}))

export const plu_sub_categories = mongoose.model('plu_sub_categories', new mongoose.Schema({
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String }
}))

export const plu_departments = mongoose.model('plu_departments', new mongoose.Schema({
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String },
    sub_departments: [{ type: mongoose.Schema.Types.ObjectId, ref: "plu_sub_departments" }]
}))

export const plu_sub_departments = mongoose.model('plu_sub_departments', new mongoose.Schema({
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String }
}))

