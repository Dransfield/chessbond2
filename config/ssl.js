module.exports = {

ssl: {
  //   ca: require('fs').readFileSync(require('path').resolve(__dirname,'ssl/bundle.crt')),
      ca: require('fs').readFileSync(require('path').resolve(__dirname,'ssl/COMODORSADomainValidationSecureServerCA.crt')),
   
     key: require('fs').readFileSync(require('path').resolve(__dirname,'ssl/chessbond.com.key')),
    cert: require('fs').readFileSync(require('path').resolve(__dirname,'ssl/www_chessbond_com.crt'))
   }
   };