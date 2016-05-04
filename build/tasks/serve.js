var gulp = require('gulp');
var browserSync = require('browser-sync');

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
gulp.task('serve', ['build'], function(done) {
    var server = browserSync.create("first server"); // Create a named instance
    var proxy = browserSync.create("proxy");

  var initCounter = 0;
  
  var onInitFinished = function(){
    if (++initCounter > 1)
    {
      done();
    }
  }
  
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
  }, onInitFinished);

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
            req.headers['Cookie']="ai_user=Lztu+|2016-04-22T17:37:56.435Z; __uvt=; __RequestVerificationToken=W5cOwIPPAzOaDeya54NcwYCs9JiZ7_2RSxXSRHsxdfkz9dbqufaSIM_sPa_EeITvk1R_OJjMShgLQMU1y6KoWHw5_BQ1; .AspNet.ApplicationCookie=5l1QMzTujg9eZYRP5GXfRQomfc27OQQ1YzGrm7j5Czgja-HVY3wjJoEYCzJMgFfxmnW3qMoWYAr72dvkDqzyoiV1sKmksaPGtp6dyin74WNt0o9qfQJQ5jYjFrgxQh2x4VD7axYw7lGRqDtXr4A8MwUvHIC0OyW3yTI-m8hC1havuD8CcwSpx_-UL7zR-6gNkbUK9D1Q8lGeAKyutFInDcAoVCaQ5yFcRbRrsTsbWwG2Hx9PndhMTLtKH1bq47pSLfXqXckDSfGPafgeNhpsieOIC_hYnoRSwkz2rgUC1IHj3SL-RhO-YDmreEIRztDWBC_bPJ1hNdeuruQb1qivZ7htq_IZ1jH1j-yttTs8Siai4myj5V-snuGavuRMhxAR8auBuBqre8s1eUiCrT_G_Ke_miQXFoPFJ9jCYyIRlhto8124vN0ieazTWuYXVw3MvKB98Os67rS73AkTDMpH7Bs8lPGoBasSV4ihETEuXJWN1g_f; uvts=4S64wTG94tNeTDW7";
            next();  
        }
   }
  }, onInitFinished);
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
