"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const cloudinary = __importStar(require("cloudinary"));
const cloud = cloudinary.v2;
cloud.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const response_service_1 = require("./response.service");
const cloudinaryImageUploadMethod = (file) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        let query = {};
        if (file.mimetype === "video/mp4") {
            query['resource_type'] = "video";
        }
        cloud.uploader.upload(file.tempFilePath, query, (err, res) => {
            if (err) {
                reject(null);
            }
            else {
                let response = {};
                res.secure_url ? response['url'] = res.secure_url : "";
                res.public_id ? response['publicid'] = res.public_id : "";
                resolve(JSON.stringify(response));
            }
        });
    });
});
const uploadimage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var file = req.files.image;
        let response = yield cloudinaryImageUploadMethod(file);
        if (response) {
            req.body.image = { url: response.url, publicid: response.publicid, name: file.name };
        }
        next();
    }
    catch (err) {
        (0, response_service_1.error)(req, res, "", err);
    }
});
const uploadimages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let images = [];
        const files = req.files.images;
        if (Array.isArray(files)) {
            for (const file of files) {
                let response = yield cloudinaryImageUploadMethod(file);
                response = JSON.parse(response);
                if (response)
                    images.push({ url: response.url, publicid: response.publicid, name: file.name.split(".")[0], filetype: file.mimetype });
            }
        }
        else {
            let response = yield cloudinaryImageUploadMethod(files);
            response = JSON.parse(response);
            if (response)
                images.push({ url: response.url, publicid: response.publicid, name: files.name.split(".")[0], filetype: files.mimetype });
        }
        req.body.images = images;
        next();
    }
    catch (err) {
        (0, response_service_1.error)(req, res, "", err);
    }
});
const uploadmultipleimages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var response = {};
        const files = req.files.images;
        if (Array.isArray(files)) {
            let images = [];
            for (const file of files) {
                const url = yield cloudinaryImageUploadMethod(file);
                if (url)
                    images.push(url);
            }
            response['data'] = images;
        }
        else {
            const url = yield cloudinaryImageUploadMethod(files);
            if (url) {
                response['data'] = url;
            }
        }
        return response;
    }
    catch (err) {
        (0, response_service_1.error)(req, res, "", err);
    }
});
const cloudinaryImageDeleteMethod = (imageid) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        cloud.uploader.destroy(imageid, { invalidate: true, resource_type: "image" }, (err, res) => {
            if (err) {
                reject(null);
            }
            else {
                resolve(res);
            }
        });
    });
});
const deleteimage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var id = req.body.carousalCloudId;
        const url = yield cloudinaryImageDeleteMethod(id);
        if (url) {
            req.body.image = { res };
        }
        next();
    }
    catch (err) {
        (0, response_service_1.error)(req, res, "", err);
    }
});
const uploadandgeturl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var file = req.files.image;
        let response = yield cloudinaryImageUploadMethod(file);
        if (response) {
            (0, response_service_1.success)(req, res, "Image uploaded successfully!", JSON.parse(response));
        }
        else {
            (0, response_service_1.error)(req, res, "Image uploading failed!", null);
        }
    }
    catch (err) {
        (0, response_service_1.error)(req, res, "", err);
    }
});
exports.default = {
    uploadimage,
    uploadimages,
    uploadmultipleimages,
    deleteimage,
    uploadandgeturl
};
//# sourceMappingURL=cloudinary.service.js.map