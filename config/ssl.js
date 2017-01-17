var files = [
  "COMODORSADomainValidationSecureServerCA.crt",
  
  "COMODORSAAddTrustCA.crt",
  "AddTrustExternalCARoot.crt"
]
var car;
for (file in files)
{
car =car+ (require('fs').readFileSync(require('path').resolve(__dirname,'ssl'+file ));
}

module.exports = {


ssl: {
  //   ca: require('fs').readFileSync(require('path').resolve(__dirname,'ssl/bundle.crt')),
      ca: car,
   
     key: require('fs').readFileSync(require('path').resolve(__dirname,'ssl/chessbond.com.key')),
    cert: require('fs').readFileSync(require('path').resolve(__dirname,'ssl/www_chessbond_com.crt'))
   }
   };