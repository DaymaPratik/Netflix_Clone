const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    userName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    playlist:{
        type:Array
    },
    token:{
        type:String
    }
})
const UserModel=mongoose.model('user_details',userSchema);
module.exports=UserModel;