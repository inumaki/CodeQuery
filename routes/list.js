const express= require('express')
const list_router= express.Router({mergeParams:true})
const app= express();
const path =require('path');
app.set('views',path.join(__dirname,'views'))
const passport = require('passport')
const isloggedin = require('../middleware')
const userobj= require('../controllers/user')
const  catchAsync= require('../utils/catchAsync')
const  expressError= require('../utils/expressError')


list_router.get('/',(req,res)=>{
    res.render('forum/list')
    })
    
      
    //---------------------------------------------------------
    
    list_router.post('/register',catchAsync(userobj.createnewuser))
    
    //---------------------login-----get-------
    
    list_router.get('/login',(req,res)=>{
    
        res.render('users/login')
    })
    
    
    list_router.post('/login',passport.authenticate('local',{failureFlash:true,
        failureRedirect:'/login'}),catchAsync(userobj.authenticateuser))
       
        //---------------------logout 
    
    list_router.get('/logout', userobj.logoutuser);
    
    //-----------------------------------------
    module.exports= list_router;