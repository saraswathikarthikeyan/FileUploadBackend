var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fileSafeSchema = new Schema({    
    fileName: {
        type: String,
        default: ''
    },
    userId: {
        type: String
    },
    filepath: {
        type: String
    }
    
});
var FilesUpload = mongoose.model('FilesUpload', fileSafeSchema);
module.exports = FilesUpload;