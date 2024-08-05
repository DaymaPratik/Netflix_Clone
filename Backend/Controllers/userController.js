const UserModel=require('../Model/userModel');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const loginUserFunction=async (req,res)=>{
    try { 
        const {email,password}=req.body;
        if(!(email && password)){
            return res.status(401).json({status:false,message:"All feilds are required"})
        }
        const ifUserExists=await UserModel.findOne({email});
        if(!ifUserExists){
             res.status(401).json({success:false,message:"User does not exists with the given email"});
             return;
        }
        const passMatch=await bcrypt.compare(password,ifUserExists.password)
        if(!passMatch){
            const token=jwt.sign(
                {id:ifUserExists._id,email},
                'ajfwjrirewifhwfwrgfwhrfghwihwgfwuiwrefwyruecyrwuwfyecurchburctr9b',
                {expiresIn:'1h'}
              )
              ifUserExists.token=token;
              ifUserExists.password=undefined;
              const options={
                expires:new Date(Date.now()+3*24*60*60*1000),
                path:'/',
               }
             res.cookie("token",token,options)
            res.json({success:false,message:"Enter correct Password"});
            return ;
        }
        res.status(200).json({
            message:"Login Successfull",
            userObj:ifUserExists
        })
    } catch (error) {
        res.status(400).json({
            message:"Unable to login"
        })
        console.log("ERROR WHILE LOGIN USER IN BACKEND ",error);
    }
}
const registerUserFunction=async(req,res)=>{
    try {
        const {userName,email,password}=req.body;
        if(!(userName && email && password)){
            return res.status(401).json({status:false,message:"All feilds are reqired"})
        }
        const user=await UserModel.findOne({email});
        console.log(user);
        if(user){
            return res.status(401).json({
                status:false,message:"User exists with given email"})
        }
        const securePass=await bcrypt.hash(password,10);
        const newlyCreatedUser=await UserModel.create({
            userName,
            email,
            password:securePass
        });
        const token=jwt.sign(
            {id:newlyCreatedUser._id,email},
            "ajfwjrirewifhwfwrgfwhrfghwihwgfwuiwrefwyruecyrwuwfyecurchburctr9b",
            {expiresIn:"1h"}
           )
        
           newlyCreatedUser.token=token;
           newlyCreatedUser.password=undefined;
        const options={
            expires:new Date(Date.now()+3*24*60*60*1000),
            path:'/',
           }
           res.cookie("token",token,options)
        console.log(newlyCreatedUser); 
        res.status(200).json({status:true,message:"User Registration successfull",userObj:newlyCreatedUser})
    } catch (error) {
        res.status(400).json('User Registration unsuccessfull please try again')
        console.log("UNALBE TO REGISTER USER IN BACKEND ",error);
    }
   
}



const addToPlayListFunction = async (req, res) => {
    const { _id, playlist } = req.body;
    console.log("BODY BODY____________________________", req.body);
    
    try {
        const findUser = await UserModel.findById(_id);
        if (!findUser) {
            return res.status(400).json({ message: "User not found" });
        }

        // Update the user's playlist
        const user = await UserModel.findOneAndUpdate(
            { _id },
            { $set: { playlist } },
            { new: true, upsert: true }
        );

        res.status(200).json({ message: "Added to playlist" ,user:user});
    } catch (error) {
        console.log("ERROR WHILE ADD TO PLAYLIST BACKEND", error);
        res.status(400).json({ message: "UNABLE TO ADD TO PLAYLIST" });
    }
};


const getPlayListFunction=async(req,res)=>{
    const {id}=req.params;
    try {
        const findUser=await UserModel.findById(id);
        if(!findUser){
            return res.status(400).json({message:"User not found"})
        }
        res.status(200).json({message:"GETTING playlist",playListArray:findUser.playlist})
    } catch (error) {
        console.log("ERROR WHILE ADD TO PLAYLIST BACKEND",error);
        res.status(400).json({message:"UNABLE TO GET PLAYLIST"})
    }
}
const deleteFomPlayListFunction=async(req,res)=>{
    const {_id,playlist}=req.body;
    try {
        const user= await UserModel.findByIdAndUpdate(
            { _id },
            { $set: { playlist } },
            { new: true, upsert: true }
        )
        res.status(200).json({message:"Item deleted from playlist",user:user})
    } catch (error) {
        console.log("ERROR BACKEND WHILE DELETING FROM PLAYLIST",error);
        res.status(400).json({message:"NOT ABLE TO DELETE ITEM"});
        
    }
}
module.exports={
    loginUserFunction,
    registerUserFunction,
    getPlayListFunction,
    addToPlayListFunction,deleteFomPlayListFunction
}