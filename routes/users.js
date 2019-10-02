var express = require('express');
const bodyParser = require('body-parser');
const cors =require('./cors');
var config = require('../config');
var User = require('../model/user');
var passport = require('passport');
var authenticate = require('../authenticate');


var router = express.Router();
router.use(bodyParser.json());


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//SignUp : Adds the new user with username and pasword
router.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      passport.authenticate('local')(req, res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, status: 'Registration Successful!'});
      });
    }
  });
});

//Login: checks the username and password into users table and return token
//Passport authentication middleware used to create token
router.route('/login')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.post(cors.cors, passport.authenticate('local'),(req,res,next) => {
   var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token: token, status: 'You are successfully logged in!'});
});

//Cleares the session and cookie on Logout.
router.get('/logout',cors.cors, (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
     res.setHeader('Content-Type', 'application/json');
    res.json({success: false, status: err});
    //next(err);
  }
});

module.exports = router;
