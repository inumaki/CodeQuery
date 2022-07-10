if(process.env.NODE_ENV !="production")
{
  require('dotenv').config()
}

const express= require('express');

const app= express();
const path =require('path')
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const {v4:uuid}= require('uuid')
app.set('view engine','ejs')
const joi = require('joi')
const mongoose = require('mongoose')
app.set('views',path.join(__dirname,'views'))
let methodOverride= require('method-override')
app.use(methodOverride("_method"))
const ejsmate= require('ejs-mate')
app.engine('ejs',ejsmate)
app.use(express.static(path.join(__dirname,'public')))

//----------utils package-----------------------

const  catchAsync= require('./utils/catchAsync')
const  expressError= require('./utils/expressError')

//------------------end utils package------------

const session = require('express-session')
const flash= require('connect-flash')
const passport= require('passport')
const localpassport= require('passport-local').Strategy
const User= require('./models/user')
const port=   3000
const secret = 'thisismysecret'
const router= require('router')
const dburl=  'mongodb://localhost:27017/forum'
const user_router= require('./routes/user')

//---------------------------------
main().catch(err => console.log(err));
//--------------------------------


const sessionConfig ={
   // store:MongoDBStore.create({  mongoUrl:dburl,secret:secret })
   name:'connsession',
   secret:secret,
   resave:false,
   saveUninitialized:false,
   cookie:{
    expires:Date.now()+1000*60*60*24*7,
    maxAge:1000*60*60*24*7,
    httpOnly:true
    }
  }
  app.use(session(sessionConfig))





//----------passport--------------------
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localpassport(User.authenticate()))
passport.serializeUser(User.serializeUser());//session support
passport.deserializeUser(User.deserializeUser());
//----------------------------------------------


//----------------------------------------------------
app.listen(port,()=>{
    console.log(`started listening at port ${port}`)
    
    })
//---------------------------------------------------
app.use((req,res,next)=>{
  res.locals.currentuser= req.user
  console.log(req.user)
next()
})

//---------------------------------------------------
    async function main() 
    {
    
      await mongoose.connect(dburl)
       console.log('connected')
    }
//----------------------------------------------------
app.use("/",user_router)
//----------------------------------------------------
app.get('/home',(req,res)=>{
    res.render('home.ejs');
    })
//------------------------------------------------------    
  
//-------------------------------------------------------
app.all('*',(req,res,next)=>{
  next(new expressError('Page not found ',404))
  })

  //----------------------------------------------

  app.use((err,req,res,next)=>{

    const {message="somthing went wrong ",statusCode=500}= err 
  const errobj= {m:message,e:statusCode}
  res.send(`status code is = ${errobj.e} ${errobj.m}`)//fix it
  next()
  })