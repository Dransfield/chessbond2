/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */
<<<<<<< HEAD

module.exports.bootstrap = function(cb) {
 
 //var express = require("express"),
   //      app = express();
 
 
  

 //_.extend(sails.hooks.http.app.locals, sails.config.http.locals); 
  
 // add the lines from here 
 // bootstrapping all the cronjobs in the crontab folder 
 //var schedule = require('node-schedule'); 
 //sails.config.crontab.crons().forEach(function(item){ 
 //schedule.scheduleJob(item.interval,sails.config.crontab[item.method]); 
 //}); 
  
 // It's very important to trigger this callback method when you are finished 
 // with the bootstrap! (otherwise your server will never lift, since it's waiting on the bootstrap) 
 
   // app.get('*', function(req,res) {  
 
     // if(req.isSocket) 
       //   return res.redirect('wss://' + req.headers.host + req.url)  
 
      //return res.redirect('https://' + req.headers.host + req.url)  
 
    //}).listen(80);
    cb();
=======
module.exports.bootstrap = function(cb) {

  cb();
>>>>>>> 6129dc5205591780bc5563a488aafcdd855c80bc
};
