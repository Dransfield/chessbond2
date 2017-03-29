module.exports.express = {
    customMiddleware: function (app) {
        var express = require('express');
      
        app.use('/node_modules', express.static(process.cwd() + '/node_modules'));
    }
    };
