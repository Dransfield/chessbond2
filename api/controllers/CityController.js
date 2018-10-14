/**
 * CityController
 *
 * @description :: Server-side logic for managing Cities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getLocation:function(req,res)
	{
				var ip2loc = require("ip2location-nodejs");
 
ip2loc.IP2Location_init("/root/db.bin");
 var returner;
 console.log(req.param('ip'));
 

    var returner={city:ip2loc.IP2Location_get_city(req.param('ip')),country:ip2loc.IP2Location_get_country_long(req.param('ip'))};
	return res.json(returner);
	/*
    for (var key in result) {
        returner=returner+(key + ": " + result[key]);
    }
   */

 
}
};

