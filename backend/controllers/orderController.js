import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import express from "express"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// placing user order for fronted
const placeOrder = async (req, res) => {
    const app = express();

    const frontedURL = "http://localhost:5173"
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        await newOrder.save()
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} })


        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "kzt",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 * 80
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: "kzt",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100 * 80
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontedURL}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontedURL}/verify?success=false&orderId=${newOrder._id}`,

        })


        res.json({ success: true, session_url: session.url })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error with payment" })
    }
}

const verifyOrders = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success == "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            res.json({ success: true, message: "Paid" })
        }
        else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false, message: "Failed to pay " })
        }
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }

}

// user orders for frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId })
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

// listing orders for the admin panel
const listOrders = async (req,res) =>{
    try {
        const orders = await orderModel.find({})
        res.json({success:true,data:orders})
    } catch(error){
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

// api for updating order status
const updateStatus = async(req,res) =>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status})
        res.json({success:true,message:"Status Update"})

        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export { placeOrder, userOrders, verifyOrders, listOrders, updateStatus }