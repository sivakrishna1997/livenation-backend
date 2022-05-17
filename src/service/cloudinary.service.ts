import * as dotenv from "dotenv";
dotenv.config();
import * as cloudinary from 'cloudinary';
const cloud = cloudinary.v2;

cloud.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
import { success, error } from "./response.service";
import { Request, Response, NextFunction } from "express";



const cloudinaryImageUploadMethod = async (file: any) => {
    return new Promise((resolve, reject) => {
        let query: any = {};
        if (file.mimetype === "video/mp4") {
            query['resource_type'] = "video"
        }
        cloud.uploader.upload(file.tempFilePath, query, (err, res: any) => {
            if (err) {
                reject(null);
            } else {
                let response: any = {}
                res.secure_url ? response['url'] = res.secure_url : "";
                res.public_id ? response['publicid'] = res.public_id : "";
                resolve(JSON.stringify(response))
            }
        }
        )
    })
}


const uploadimage = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        var file = req.files.image;
        let response: any = await cloudinaryImageUploadMethod(file);
        if (response) {
            req.body.image = { url: response.url, publicid: response.publicid, name: file.name };
        }
        next();
    }
    catch (err) {
        error(req, res, "", err);
    }
}


const uploadimages = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        let images: any = [];
        const files = req.files.images;
        if (Array.isArray(files)) {
            for (const file of files) {
                let response: any = await cloudinaryImageUploadMethod(file);
                response = JSON.parse(response);
                if (response) images.push({ url: response.url, publicid: response.publicid, name: file.name.split(".")[0], filetype: file.mimetype });
            }
        } else {
            let response: any = await cloudinaryImageUploadMethod(files);
            response = JSON.parse(response);
            if (response) images.push({ url: response.url, publicid: response.publicid, name: files.name.split(".")[0], filetype: files.mimetype });
        }
        req.body.images = images;
        next();
    }
    catch (err) {
        error(req, res, "", err);
    }
}

const uploadmultipleimages = async (req: Request | any, res: Response) => {
    try {
        var response: any = {};
        const files = req.files.images;
        if (Array.isArray(files)) {
            let images = [];
            for (const file of files) {
                const url = await cloudinaryImageUploadMethod(file);
                if (url) images.push(url);
            }
            response['data'] = images;
        }
        else {
            const url = await cloudinaryImageUploadMethod(files);
            if (url) {
                response['data'] = url;
            }
        }
        return response;
    }
    catch (err) {
        error(req, res, "", err);
    }
}


const cloudinaryImageDeleteMethod = async (imageid: any) => {
    return new Promise((resolve, reject) => {
        cloud.uploader.destroy(imageid, { invalidate: true, resource_type: "image" }, (err, res) => {
            if (err) {
                reject(null);
            } else {
                resolve(res)
            }
        }
        )
    })
}

const deleteimage = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        var id = req.body.carousalCloudId;
        const url = await cloudinaryImageDeleteMethod(id);
        if (url) {
            req.body.image = { res };
        }
        next();
    }
    catch (err) {
        error(req, res, "", err);
    }
}


const uploadandgeturl = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        var file = req.files.image;
        let response: any = await cloudinaryImageUploadMethod(file);
        if (response) {
            success(req, res, "Image uploaded successfully!", JSON.parse(response));
        } else {
            error(req, res, "Image uploading failed!", null);
        }
    }
    catch (err) {
        error(req, res, "", err);
    }
}



export default {
    uploadimage,
    uploadimages,
    uploadmultipleimages,
    deleteimage,
    uploadandgeturl
};
