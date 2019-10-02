var express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const uploadRouter = express.Router({ mergeParams: true });
var multer = require('multer');
const cors = require('./cors');
const authenticate = require('../authenticate');

const FilesUpload = require('../model/fileuploads'); 


uploadRouter.use(bodyParser.json());
 
const DIR = './uploads';

//copy the file into the upload folder
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      let fileNameParts = file.originalname.split('.');        
      console.log(fileNameParts[0],fileNameParts[1]);
      cb(null, fileNameParts[0] + '-' + Date.now() + '.' + fileNameParts[1]);
    }
});
let upload = multer({storage: storage});

//Get: return the files uploaded by the User, using the Request userId
uploadRouter.route('/')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser,(req,res,next) => {
  FilesUpload.find( { userId: req.user._id })
  .then((files)=>{
      res.statusCode = 200;
      res.setHeader('contentType','application/json');
      res.json(files);
  },(err)=>next(err))
  .catch((err)=>next(err));
})
.post(cors.cors,authenticate.verifyUser, upload.single('file'),function(req, res, next) {
//Post: upload the file into the folder and then insert the fild details into the table.

  let getfileNameParts = req.file.originalname.split('.');        
  let storeFileName = getfileNameParts[0] + '-' + Date.now() + '.' + getfileNameParts[1];
  let storeFilePath = '/uploads/'+ storeFileName;
  let storeuserid = req.user._id;


    if (!req.file) { // if no file is received return false
        console.log("No file received");
        return res.send({
          success: false
        });
    
      } else {
        console.log('file received');
        //inserts the record into table after the upload
        FilesUpload.create( { fileName:storeFileName, userId:storeuserid, filepath:storeFilePath } )
        .then((data) => {
            console.log('file Created',data);
            res.statusCode = 200;
            res.setHeader('contentType','application/json');
            res.json(data);
        },(err) => next(err))
        .catch((err) => next(err));

       /* return res.send({
          success: true,
          fileName:storeFileName
        });*/
      }
  });
  module.exports = uploadRouter;