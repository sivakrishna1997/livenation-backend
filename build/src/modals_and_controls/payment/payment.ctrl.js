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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const paypal_rest_sdk_1 = __importDefault(require("paypal-rest-sdk"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const response_service_1 = require("../../service/response.service");
const paypalConfig = {
    mode: 'sandbox',
    client_id: process.env.PAYPAL_CLIENT_ID || '',
    client_secret: process.env.PAYPAL_CLIENT_SECRET || ''
};
paypal_rest_sdk_1.default.configure(paypalConfig);
const pay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        const create_payment_json = {
            intent: "sale",
            payer: {
                payment_method: "paypal"
            },
            redirect_urls: {
                return_url: "http://localhost:4200/success",
                cancel_url: "http://localhost:4200/cancel"
            },
            transactions: [{
                    item_list: {
                        items: [{
                                name: "ticket",
                                sku: "001",
                                price: "1.00",
                                currency: "USD",
                                quantity: 1
                            }]
                    },
                    amount: {
                        currency: "USD",
                        total: "1.00"
                    },
                    description: "Buying ticket for concet."
                }]
        };
        paypal_rest_sdk_1.default.payment.create(create_payment_json, (err, payment) => {
            if (err) {
                (0, response_service_1.error)(req, res, 'Payment Failed!', err);
            }
            else {
                console.log('Create Payment Response', payment);
                // if (payment.state === 'approved') {
                //     success(req, res, 'Payment Successful!', payment);
                // } else {
                // }
            }
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
exports.default = {
    pay
};
//# sourceMappingURL=payment.ctrl.js.map