const Razorpay = require('razorpay');
const COURT_SCHEDULES = require('../models/courtScheduleModal.js');
const ObjectId = require('mongoose').Types.ObjectId;

const order = async (req, res) => {
    try {
        const idArr = await req.body.data.map(ele => {
            return new ObjectId(ele);
        })
        const slotData = await COURT_SCHEDULES.find({
            "_id" : {
                $in : idArr
            }
        });

        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });
        let amount = 0;
        slotData.forEach(element => {
            amount += parseInt(element.rate);
        });
        const options = {
            amount: amount * 100, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_74394",
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");

        res.json({ order, idArr});
    } catch (error) {
        res.status(500).send(error);
    }
}; 

const success = async (req, res) => {
    try {
        // getting the details back from our font-end
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body.data;
        await COURT_SCHEDULES.updateMany({
            "_id" : {
                $in : req.body.idArr
            }
        }, { $set : { bookedBy : req.userId}})
        // Creating our own digest
        // The format should be like this:
        // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
        const shasum = crypto.createHmac("sha256", "w2lBtgmeuDUfnJVp43UpcaiT");

        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");

        // comaparing our digest with the actual signature
        if (digest !== razorpaySignature)
            return res.status(400).json({ msg: "Transaction not legit!" });

        // THE PAYMENT IS LEGIT & VERIFIED
        // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

        res.json({
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = { order, success }