const express = require('express');
const router = express.Router();
const passport = require('passport');
const session = require('express-session')

const isloggedin = (req,res,next)=>{
    if( !req.isAuthenticated() ){
req.session.storeUrl = req.originalUrl
return res.redirect('/login')
    }
next();
}

module.exports = isloggedin