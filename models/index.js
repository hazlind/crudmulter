const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/signup');
mongoose.Promise=Promise;

module.exports.User =require('./signup');