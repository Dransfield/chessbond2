module.exports.express = {
    customMiddleware: function (app) {
        var express = require('express');
        app.use(express.compress());
    }
    };
