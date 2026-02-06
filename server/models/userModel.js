import mongoose from "mongoose";
  
const userSchema = new mongoose.Schema({
name : {type : String ,require : true},
email :{type : String ,require : true , unique : true },
password : {type : String ,default : ''},
verifyOtp : {type : String ,default : 0},
verifyOtpExpireAt : {type :Number ,default : 0},
isAccountVerified : {type :Boolean ,default : 'false'},
resetOtp :  {type:String ,default : ''},
resetOtpExpireAt :{type :Number ,default : 0},

})
const userModel = mongoose.model('User', userSchema);
export default userModel ;
