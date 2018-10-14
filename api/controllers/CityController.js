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
testip = [req.ip];//['8.8.8.8', '2404:6800:4001:c01::67', '2001:0200:0102:0000:0000:0000:0000:0000', '2001:0200:0135:0000:0000:0000:0000:0000', '2001:0200:017A:0000:0000:0000:0000:0000'];
for (var x = 0; x < testip.length; x++) {
    result = ip2loc.IP2Location_get_all(testip[x]);
	return res.json(result[country_long);
	/*
    for (var key in result) {
        returner=returner+(key + ": " + result[key]);
    }
   */
}
 
}
};

