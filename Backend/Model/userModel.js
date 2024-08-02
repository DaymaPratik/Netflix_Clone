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
    }
})
const UserModel=mongoose.model('User_Details',userSchema);
module.exports=UserModel;