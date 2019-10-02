const express = require('express');
const cors = require('cors');

//Cors to allow the website. http://localhost:4200

const whitelist = ['http://localhost:4200'];
var corsOptionsDelegate = (req, callback) => {
    var corsOptions;
    
    console.log(req.header('Origin'));

    if(whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    }
    else {
        corsOptions = { origin: false };
    }   
    callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);