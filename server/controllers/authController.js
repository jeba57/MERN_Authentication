
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from "../config/nodemailer.js";

export const register =  async(req, res)=>{
const {name, email, password} = req.body;
    if(!name || !email || !password){
        return res.json({ success: false, message : 'MISSING DATA'})
    }

try {
   const existingUser = await userModel.findOne({email}) 
   if(existingUser){
   return res.json({success : false, message: "user already exist"});
   }

const hashedPassword = await bcrypt.hash(password, 10);
        
const user = new userModel({ name, email, password:hashedPassword})
await user.save();


const token = jwt.sign({id:user._id},process.env.JWT_SECRET, {expiresIn:"7d"} );

res.cookie('token',token , {
    httpOnly:true,
    secure: process.env.NODE_ENV ==='production',
    sameSite: process.env.NODE_ENV ==='production'?
    'none': 'strict',
    maxAge: 7* 24 * 60 * 60*1000
});

//sending welcom email
const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject:'welcome to Loggy',
    text: `welcom to loggy website . your account has been created 
    with email id: ${email} `
}
await transporter.sendMail(mailOptions);
 return res.json({success: true});
 console.log("✅ Email sent successfully");
}

catch (error) {
    res.json({success: false, message : error.message})
}
}


// login

export const login = async (req, res )=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.json({success: false, message: "email and password are reqired"})
    }
try {
    const user= await userModel.findOne({email});
    if(!user){
     return res.json({ success: false, message:'Invalid email'})
    }

    const isMatch = await bcrypt.compare(password, user.password);

       if(!isMatch) {
return res.json({success: false, message:'Invalid password'})
       }

       const token = jwt.sign({id:user._id},process.env.JWT_SECRET, {expiresIn:'7d'} );

res.cookie('token',token , {
    httpOnly: true,
    secure:process.env.NODE_ENV ==='production',
    sameSite:process.env.NODE_ENV ==='production'?
    'none': 'strict',
    maxAge: 7* 24 * 60 *60 *1000
});

    return res.json({ success:true});    
        
} catch (error) {
     return res.json({ success: false, message:error.message});

}
}

//logout

export const logout = async ( req, res)=>{

try {
    res.clearCookie('token', {
     httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production'?
    'none': 'strict',   
})

 return res.json({ success: true, message : "logged out"})

} catch (error) {
    return res.json({ success: false, message:error.message}); 
}

}


//send verification OTP  to user Id
export const sendVerifyOtp = async(req, res)=>{
try{
const {userId} = req.body;
const user = await userModel.findById(userId);
if(user.isAccountVerified){
    return res.json({success:false, message:"Account Already verifyed"})
}

const otp = String(Math.floor(100000 + Math.random() * 900000));
user.verifyOtp = otp;
user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000

await user.save();

const mailOption = {
from: process.env.SENDER_EMAIL,
    to: user.email,
    subject:'Account Verificatin Otp',
    text: `Your OTP is ${otp}. verified your account using this OTP.`
}
await transporter.sendMail(mailOption);
res.json({ success : true , message:'Verification Otp Send on Email'})


}catch(error){

    res.json({ success: false, message: error.message})
}

}

// verify thr account 

export const verifyEmail = async (req, res)=>{
const {userId, otp} = req.body; 

if(!userId ||!otp){
 return res.json({success:false, message:"Missing Details"});
}

try {
  const user = await userModel.findById(userId);
     
if(!user){
    return res.json({ success : false, message: 'User not Found'});
}
if(user.verifyOtp === ''|| user.verifyOtp !== otp){
    return res.json({ sucess: false , mesaage : 'Invalid OTP'});
}
if(user.verifyOtpExpireAt < Date.now()){
    return res.json({ sucess : false, message : 'OTP expired'})
}
user.isAccountVerified = true;
user.verifyOtp = '';
user.verifyOtpExpireAt = 0;

await user.save();
return res.json({ sucess: true, message:'Email Verification successfully completed'})


} catch (error) {
    return res.json({ success: false, message:error.message});
}

}
export const isAuthenticated = async (req, res)=>{
    try {
      return res.json({success: true})

    } catch (error) {
       res.json({ success: false, message: error.message}); 
    }
}

// send password reset otp 

export const sendResetOtp = async(req,res)=>{
 const {email} = req.body;

if(!email){
return res.json({success:false, message: "Email is Require" })
}
    try {
    const user = await userModel.findOne({email})
    if(!user){
        return res.json({ sucess: false, message: " User not Found"})
    }
      
    const otp = String(Math.floor(100000 + Math.random() * 900000));


 user.resetOtp = otp;
 user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000

 await user.save();

 const mailOption = {
 from: process.env.SENDER_EMAIL,
    to: user.email,
    subject:'Password Reset OTP',
    text: `Your Reset OTP is ${otp}.`
};

  await transporter.sendMail(mailOption);
 return res.json({ success : true , message:'OPT Send to Your Email ID, Please Check'})


    } catch (error) {
        res.json({ success: false, message: error.message});
    }
}


// reset user password 

export const resetPassword = async(req, res)=>{

const {email, otp, newPassword} = req.body;

if(!email || !otp || !newPassword){
    return res.json({success:false , message: 'Email, OTP, and new password are requird '});
}
   
    
    try {
       
        const user = await userModel.findOne({email});
     if(!user){
        res.json({success: false,message: 'User Not Found' });
     }
     if(user.resetOtp === "" || user.resetOtp !== otp){
        return res.json({succsee: false, message: 'Invalid OTP '});

     }

if(user.resetOtpExpireAt < Date.now ()){
    return res.json({succsee: false, message:' OTP Expire '});
}

const hashedPassword = await bcrypt.hash(newPassword, 10);
user.password = hashedPassword;
user.resetOtp = '';
user.resetOtpExpireAt = 0;

await user.save();

return res.json({succsee: true, message: 'Password has been reset successfully '});

    } catch (error) {
       res.json({success: false, message: error.message}) 
    }
}


