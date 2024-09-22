import express from "express"
import cors from "cors"
import { connectDB} from "./config/db.js"
import productRouter from "./routes/productRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import userModel from "./models/userModel.js"
// app config
const app = express()
const port = 4000

// middleware
app.use(express.json())
app.use(cors())

// db connection
connectDB();

// api endpoint
app.use("/api/product", productRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)

// NOTE The code works, but need to be reworked to be more readible
// const checkRole = (roles) => {
//     return (req, res, next) => {
//       const user = userModel.findById(req.id); // Assuming user information is stored in req.user
//         console.log(user)
//       if (roles.includes(user.role)) {
//         next(); // User has one of the required roles, proceed
//       } else {
//         return res.status(403).json({ message: 'Access denied' });
//       }
//     };
//   };
  
//   // Usage: Protect routes based on roles
//   app.get('/admin', checkRole(['admin']), (req, res) => {
//     res.send('Welcome Admin');
//   });
  
//   app.get('/user', checkRole(['user', 'admin']), (req, res) => {
//     res.send('Welcome User or Admin');
//   });

// // Example of an admin-only route
// app.get('/admin-dashboard', checkRole(['admin']), (req, res) => {
//     res.json({ message: 'Admin Dashboard' });
//   });
  
//   // Example of a route for all users (admin and regular)
//   app.get('/user-dashboard', checkRole(['user', 'admin']), (req, res) => {
//     res.json({ message: 'User Dashboard' });
//   });


app.get("/", (req,res) => {
    res.send("API Working")
})

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
})

// mongodb+srv://saltyku:YEsXGmu417Qp7vna@cluster0.2wsy4.mongodb.net/?