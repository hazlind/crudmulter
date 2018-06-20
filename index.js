var express=require('express');
var app=express();
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var path=require('path');
const passport=require('passport');
const localPassport=require('passport-local').Strategy;
const localPasssportMongoose=require('passport-local-mongoose');
// for multer
const multer=require('multer');

// var methodOverride=require('method-overide');

//for body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.set('public',path.join(__dirname, 'public'));
app.set('views',path.join(__dirname,'views'));

// app.use(methodOverride('_method'));

//initailising passport
app.use(passport.initialize());
app.use(passport.session());


///connecting to mongoose
mongoose.connect('mongodb://localhost/passport_local_mongoose_examples', function(err) {
    if (err) {
        console.log('Could not connect to mongodb on localhost. Ensure that you have mongodb running on localhost and mongodb accepts connections on standard ports!');
    }
});


//getting user model to aunthenticate to passport

var db=require('./models/index');
var User=db.User;

passport.use(new localPassport(User.authenticate()));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//getting browser route

var browserPage=require('./routes/browser.js');
app.use('/',browserPage);

//for error handling
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});



app.listen(2001,function(){
    console.log('running on port 2001 ');
});