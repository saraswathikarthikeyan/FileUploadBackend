var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;


var User = new Schema({    
    username: {
        type: String,
        default: ''
    },
    password: {
        type: String
    }
    
});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);