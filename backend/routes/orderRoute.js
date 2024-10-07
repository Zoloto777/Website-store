import express from "express"
import authMiddleware from "../middleware/auth.js"
import { placeOrder, userOrders, verifyOrders, listOrders, updateStatus } from "../controllers/orderController.js"

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrders)
orderRouter.post("/userorders", authMiddleware, userOrders)
orderRouter.post("/status", updateStatus)
orderRouter.get("/list", listOrders)
export default orderRouter;