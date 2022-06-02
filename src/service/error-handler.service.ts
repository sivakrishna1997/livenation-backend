
export const userErrs = (error: any): string => {
    let err_msg = '';
    if (error.keyValue?.username != null && error.name === "MongoError" && error.code === 11000) {
        err_msg = "User Name already exist";
    } else if (error.keyValue?.email != null && error.name === "MongoError" && error.code === 11000) {
        err_msg = "Email already exist";
    } else if (error.keyValue?.mobile != null && error.name === "MongoError" && error.code === 11000) {
        err_msg = "Mobile Number already exist";
    } else {
        err_msg = error.message;
    }
    return err_msg;
}

export const artistErrs = (error: any): string => {
    let err_msg = '';
    if (error.keyValue?.name != null && error.name === "MongoError" && error.code === 11000) {
        err_msg = "Artist Name already exist";
    } else {
        err_msg = error.message;
    }
    return err_msg;
}

export const communityErrs = (error: any): string => {
    let err_msg = '';
    if (error.keyValue?.name != null && error.name === "MongoError" && error.code === 11000) {
        err_msg = "Community Name already exist";
    } else {
        err_msg = error.message;
    }
    return err_msg;
}


export const genreErrs = (error: any): string => {
    let err_msg = '';
    if (error.keyValue?.name != null && error.name === "MongoError" && error.code === 11000) {
        err_msg = "Genre Name already exist";
    } else {
        err_msg = error.message;
    }
    return err_msg;
}


export const venueErrs = (error: any): string => {
    let err_msg = '';
    if (error.keyValue.name != null && error.name === "MongoError" && error.code === 11000) {
        err_msg = "Venue Name already exist";
    } else {
        err_msg = error.message;
    }
    return err_msg;
}

export const stageErrs = (error: any): string => {
    let err_msg = '';
    if (error.keyValue?.name != null && error.name === "MongoError" && error.code === 11000) {
        err_msg = "Stage Name already exist";
    } else {
        err_msg = error.message;
    }
    return err_msg;
}



export const pluColorErrs = (error: any): string => {
    let err_msg = '';
    if (error.keyValue?.name != null && error.name === "MongoError" && error.code === 11000) {
        err_msg = "Color Name already exist";
    } else {
        err_msg = error.message;
    }
    return err_msg;
}

export const pluSizeErrs = (error: any): string => {
    let err_msg = '';
    if (error.keyValue?.name != null && error.name === "MongoError" && error.code === 11000) {
        err_msg = "Size Name already exist";
    } else {
        err_msg = error.message;
    }
    return err_msg;
}

export const pluBrandErrs = (error: any): string => {
    let err_msg = '';
    if (error.keyValue?.name != null && error.name === "MongoError" && error.code === 11000) {
        err_msg = "Brand Name already exist";
    } else {
        err_msg = error.message;
    }
    return err_msg;
}

export const pluCategoryErrs = (error: any): string => {
    let err_msg = '';
    if (error.keyValue?.name != null && error.name === "MongoError" && error.code === 11000) {
        err_msg = "Category Name already exist";
    } else {
        err_msg = error.message;
    }
    return err_msg;
}

export const pluSubCategoryErrs = (error: any): string => {
    let err_msg = '';
    if (error.keyValue?.name != null && error.name === "MongoError" && error.code === 11000) {
        err_msg = "Sub Category Name already exist";
    } else {
        err_msg = error.message;
    }
    return err_msg;
}

export const pluDepartmentErrs = (error: any): string => {
    let err_msg = '';
    if (error.keyValue?.name != null && error.name === "MongoError" && error.code === 11000) {
        err_msg = "Department Name already exist";
    } else {
        err_msg = error.message;
    }
    return err_msg;
}

export const pluSubDepartmentErrs = (error: any): string => {
    let err_msg = '';
    if (error.keyValue?.name != null && error.name === "MongoError" && error.code === 11000) {
        err_msg = "Sub Department Name already exist";
    } else {
        err_msg = error.message;
    }
    return err_msg;
}


export const pluMasterErrs = (error: any): string => {
    let err_msg = '';
    if (error.keyValue?.bracode != null && error.name === "MongoError" && error.code === 11000) {
        err_msg = "Barcode already exist";
    } else {
        err_msg = error.message;
    }
    return err_msg;
}


export const inventoryPurposeErrs = (error: any): string => {
    let err_msg = '';
    if (error.keyValue?.name != null && error.name === "MongoError" && error.code === 11000) {
        err_msg = "Purpose Name already exist";
    } else {
        err_msg = error.message;
    }
    return err_msg;
}

export const inventoryErrs = (error: any): string => {
    debugger
    let err_msg = '';
    if (error.keyValue?.incomming_number != null && error.name === "MongoError" && error.code === 11000) {
        err_msg = "Inventory incomming number already exist";
    } else {
        err_msg = error.message;
    }
    return err_msg;
}
