module.exports = {
files = [
  "COMODORSADomainValidationSecureServerCA.crt",
  
  "COMODORSAAddTrustCA.crt",
  "AddTrustExternalCARoot.crt"
]

for (file in files)
{
car =car+ (require('fs').readFileSync(require('path').resolve(__dirname,'ssl'+file )
}
ssl: {
  //   ca: require('fs').readFileSync(require('path').resolve(__dirname,'ssl/bundle.crt')),
      ca: ca,
   
     key: require('fs').readFileSync(require('path').resolve(__dirname,'ssl/chessbond.com.key')),
    cert: require('fs').readFileSync(require('path').resolve(__dirname,'ssl/www_chessbond_com.crt'))
   }
   };