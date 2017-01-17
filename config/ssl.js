/*var files = [
  "COMODORSADomainValidationSecureServerCA.crt",
  
  "COMODORSAAddTrustCA.crt",
  "AddTrustExternalCARoot.crt"
]
var car;
for (file in files)
{
car =car+ (require('fs').readFileSync(require('path').resolve(__dirname,'ssl/'+files[file] )));
}
*/
var files=[
require('fs').readFileSync(require('path').resolve(__dirname,'ssl/COMODORSADomainValidationSecureServerCA.crt')),
require('fs').readFileSync(require('path').resolve(__dirname,'ssl/COMODORSAAddTrustCA.crt')),
require('fs').readFileSync(require('path').resolve(__dirname,'ssl/AddTrustExternalCARoot.crt'))
]
module.exports = {


ssl: {
     //ca: require('fs').readFileSync(require('path').resolve(__dirname,'ssl/bundle.crt')),
      ca: files,
   
     key: require('fs').readFileSync(require('path').resolve(__dirname,'ssl/chessbond.com.key')),
    cert: require('fs').readFileSync(require('path').resolve(__dirname,'ssl/www_chessbond_com.crt'))
   }
   };