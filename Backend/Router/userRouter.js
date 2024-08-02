const express=require('express');
const {loginUserFunction,registerUserFunction,getPlayListFunction,
    addToPlayListFunction}=require('../Controllers/userController')
const router=express.Router();
router.post('/api/login',loginUserFunction)
router.post('/api/addToPlaylist',addToPlayListFunction);
router.get('/api/getPlaylist/:id',getPlayListFunction);
router.post('/api/register',registerUserFunction)
module.exports=router;