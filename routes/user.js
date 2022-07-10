const express= require('express')
const user_router= express.Router({mergeParams:true})
const app= express();
const path =require('path');
const User= require('../models/user')
app.set('views',path.join(__dirname,'views'))
const passport = require('passport')
const isloggedin = require('../middleware')
const userobj= require('../controllers/user')
const  catchAsync= require('../utils/catchAsync')
const  expressError= require('../utils/expressError')
  //---------------------
user_router.get('/register',(req,res)=>{
res.render('users/register')

})

  
//---------------------------------------------------------

user_router.post('/register',catchAsync(userobj.createnewuser))

//---------------------login-----get-------

user_router.get('/login',(req,res)=>{

    res.render('users/login')
})


user_router.post('/login',passport.authenticate('local',{failureFlash:true,
    failureRedirect:'/login'}),catchAsync(userobj.authenticateuser))
   
    //---------------------logout 

user_router.get('/logout', userobj.logoutuser);

//-----------------------------------------
module.exports= user_router;