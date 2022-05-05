import paypal, { ConfigureOptions, Payment } from 'paypal-rest-sdk';
import * as dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import { success, error } from '../../service/response.service';
import { ObjectId } from 'mongodb';

const paypalConfig: ConfigureOptions = {
    mode: 'sandbox', //sandbox or live
    client_id: process.env.PAYPAL_CLIENT_ID || '',
    client_secret: process.env.PAYPAL_CLIENT_SECRET || ''
}
paypal.configure(paypalConfig);



const pay = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        const create_payment_json: Payment = {
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

        paypal.payment.create(create_payment_json, (err, payment) => {
            if (err) {
                error(req, res, 'Payment Failed!', err);
            } else {
                console.log('Create Payment Response', payment);
                // if (payment.state === 'approved') {
                //     success(req, res, 'Payment Successful!', payment);
                // } else {

                // }
            }
        })
    } catch (err) {
        error(req, res, '', err)
    }
}


export default {
    pay
};