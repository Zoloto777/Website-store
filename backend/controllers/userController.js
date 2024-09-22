import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import validator from "validator"
import nodemailer from 'nodemailer'
import crypto from 'crypto'

const minLength = 8

const senderEmail = 'kudesn1kescobar@gmail.com'
// Nodemailer does not require the password of your email, it require the password of your app, read this please https://stackoverflow.com/questions/45478293/username-and-password-not-accepted-when-using-nodemailer
// Nodemailer просит не пароль вашего email'ла а пароль приложений, более подробно здесь https://stackoverflow.com/questions/45478293/username-and-password-not-accepted-when-using-nodemailer
const senderPass = 'ylak nyso ybfu dewr'

// login user
const loginUser = async(req,res) => {
    const {email, password} = req.body;

    try {
        const user = await userModel.findOne({email})

        if (!user){
            return res.json({success: false, message: "User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        
        if (!isMatch) {
            return res.json({success: false, message: "Invalid password"})
        }
        else{
            console.log("3")
        }

        const token = createToken(user._id)
        res.json({success: true, token})
    } catch(error){
        console.log(error)
        res.json({success: false, message: error})
    }
}
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}
//registre user
const registerUser = async(req,res) => {
    const {name, password, email , role} = req.body;
    console.log({email})
    try{
        // checking does user exist
        const exists = await userModel.findOne({email})
        if (exists){
            return res.json({success: false, message:"User already exists"})
        }
        // validating email format and strong password
        if (!validator.isEmail(email)){
            return res.json({success: false, message:"Enter valid email"})
        }

        if (password.length < minLength){
            return res.json({success: false, message:"Password is weak; too short"})
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name : name,
            email: email,
            password: hashedPassword,
            role: role || 'user'
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success: true, token})


    } catch(error){
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

// request password reset
const requestPasswordReset = async (req,res) => {
    const {email} = req.body;
    const user = await userModel.findOne({email})

    try {
        if (!validator.isEmail(email)){
            return res.json({success: false, message:"Enter a valid email"})
        }

        if (!user){
            return res.json({success: false, message:"No acoount with this email"})
        }
        // Generate reset token
        const token = crypto.randomBytes(32).toString('hex');
    
        // Set token and expiration on user model
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 7200000; // 1 hour from now

        await user.save();
        // creating transporter with your email
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: senderEmail,
              pass: senderPass
            }
          });
          console.log(email)

        var mailOptions = {
            from: senderEmail,
            to: email,
            subject: 'Sending Email using Node.js',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
            Please click on the following link, or paste this into your browser to complete the process:\n\n
            http://localhost:4000/reset-password/${token}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`,
          };
        
        // sending the mail
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log("Sending email error: " + error);
            } else {
              console.log('Email sent: ' + info.response);
            }
        

        });

        return res.status(200).send('Password reset email sent.');
    } catch(error){
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

// reset password
const resetPassword = async(req,res) => {
    try {
        const { token } = req.query;
        const { newPassword } = req.body;

        // The replace(/^"|"$/g, '') part removes the double quotes at the start (^") and end ("$) of the token string, if they exist
        const trimmedToken = token.replace(/^"|"$/g, '')

        // Find the user
        const user = await userModel.findOne({
          resetPasswordToken: trimmedToken,
          resetPasswordExpires: { $gt: Date.now() }, // Ensure the token hasn't expired
        });
        
        // Check if the user exists
        if (!user) {
          return res.json({success: false,message: "no user was found", data: user});
        }

        // Hash the new password and save it
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        // Clear the reset token fields
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
    
        await user.save();
    
        res.status(200).send('Password has been updated.');
      } catch (error) {
        res.status(500).send('Error resetting password');
      }
}

// The code to compare char codes of 2 strings, help me with some things, not used for now
// Код для сравнения чар кодов 2 строк, он мне помог с кое-чем, сейчас не используется
const compareCharCodes = (str1, str2) => {
    console.log('Comparing char codes...');
    for (let i = 0; i < Math.max(str1.length, str2.length); i++) {
      console.log(`Char at position ${i}:`, str1.charCodeAt(i), str2.charCodeAt(i));
    }
  };

export {loginUser, registerUser, resetPassword,requestPasswordReset}