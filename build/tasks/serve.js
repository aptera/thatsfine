var gulp = require('gulp');
var browserSync = require('browser-sync');

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
gulp.task('serve', ['build'], function(done) {
    var server = browserSync.create("first server"); // Create a named instance
    var proxy = browserSync.create("proxy");

  server.init({
    online: false,
    open: false,
    port: 9000,
    ui: {
        port: 3001
    },
    server: {
      baseDir: ['.'],
      middleware: function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();    
      }

    }
  });
   proxy.init({
    online: false,
    open: false,
    port: 9001,
      https: true,
    ui: {
        port: 3002
    },
    proxy: {
        target: "https://thereisno.trystructure.com/api/v1/",
        middleware: function (req, res, next) {
            req.headers['Cookie']="__RequestVerificationToken=946Vme3tXsI-9E3E54-paf5dFIf0UdCBrxOIbL--j2ZpA8-r-8weNfj6JlA6U1JDkLY0hzRPV1KpTiCydzb2eQQZfPA1; .AspNet.ApplicationCookie=8Lt5JN4OBMDzCZAf58lM1rSVoLoSFhtJwlMK_S3xERTGYoTXA6kFCS_HKc0t7zXfrpnuUKiLSPHMSI55fAabGQLgGFRVhJ0fMigETyB4-KAhY1FpKUSHc62n8FxgfXZ3LW8ykHGj_LejlU84lUvzKh-GG80C9bjJoupagNAKoo6SA_x63HFzQFI86skdG8Mir16147JGkxjMJtpYRxR0N4-toXyYNqj1eBsjWkS1_Vleto0uQU2i6ApwSc527eO41IzdU2jAUgAeRDeSUbddU9KA-KfjQ0Maf6eHw1FB7wu-pWIFWlCNCIiuvDxxLliVd_O6pMUEBEIxkEFEprayfCfgyeFUt_Et2WJ17ueReEim1RUIt75m7VJckmyMdMyY4pejr6BWeeAbWoXMQaz36rR0F7O80mpJD_Nw_BIQN3PS2G-k77ZHwl2yPAEKyN-z-86pRKXMclO96jzdBmU_YtE-4eLd6FYhz4z2hXoX-asliee7; __uvt=";
            next();  
        }
   }
  });
});
// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
gulp.task('serve-bundle', ['bundle'], function(done) {
  browserSync({
    online: false,
    open: false,
    port: 9000,
    server: {
      baseDir: ['.'],
      middleware: function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  }, done);
});
