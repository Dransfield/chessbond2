module.exports = {

ssl: {
     ca: require('fs').readFileSync(require('path').resolve(__dirname,'ssl/COMODORSADomainValidationSecureServerCA')),
     key: require('fs').readFileSync(require('path').resolve(__dirname,'ssl/chessbond.key')),
     cert: require('fs').readFileSync(require('path').resolve(__dirname,'ssl/www_chessbond_com.crt'))
   }
   };