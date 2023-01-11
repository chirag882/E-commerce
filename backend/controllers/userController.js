const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

// Register User
exports.registerUser = catchAsyncErrors( async (req,res,next)=>{
    
    const {name,email,password} = req.body;

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id : "This is a sample ID",
            url : "hdnksmakfm"
        }
    })

    sendToken(user,201,res);

});

// Login User

exports.loginUser = catchAsyncErrors( async (req,res,next) =>{

    const {email,password} = req.body;

    // checking if user has given password and email both

    if(!email || !password){
        return next(new ErrorHandler("Please enter email and password",404));
    }

    const user = await User.findOne({email}).select("+password"); 
    // select has been used because in model we have mentioned password as {select : false}

    if(!user){
        return next(new ErrorHandler("Invalid email or password"));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password"));
    }

    const token = user.getJWTToken();

    sendToken(user,200,res);

})

// Logout User

exports.logout = catchAsyncErrors( async (req,res,next)=>{

    res.cookie("token",null,{
        expires : new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).json({
        success : true,
        message : "Logged Out"
    })

});