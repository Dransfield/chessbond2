module.exports = {
files = [
  "COMODORSADomainValidationSecureServerCA.crt",
  
  "COMODORSAAddTrustCA.crt",
  "AddTrustExternalCARoot.crt"
]
ca = (fs.readFileSync "/path/to/#{file}" for file in files)
ssl: {
  //   ca: require('fs').readFileSync(require('path').resolve(__dirname,'ssl/bundle.crt')),
      ca: ca,
   
     key: require('fs').readFileSync(require('path').resolve(__dirname,'ssl/chessbond.com.key')),
    cert: require('fs').readFileSync(require('path').resolve(__dirname,'ssl/www_chessbond_com.crt'))
   }
   };