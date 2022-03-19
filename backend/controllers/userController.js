const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwttoken");

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is sample",
      url: "picurl",
    },
  });

  sendToken(user,201,res);
});


exports.loginUser=catchAsyncErrors(async(req,res,next)=>{
    const {email,password}=req.body;

    if(!email||!password){
        return next(new ErrorHandler("Please enter Email & password",400));
    }
    const user=await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Email/Password",401));
    }
    const isPasswordMatched=await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email/Password",401));
    }
    sendToken(user,200,res);
})