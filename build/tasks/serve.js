var gulp = require('gulp');
var browserSync = require('browser-sync');

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
gulp.task('serve', ['build'], function(done) {
    var server = browserSync.create("first server"); // Create a named instance
    var proxy = browserSync.create("proxy");
    
    var cookie = null;

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
        proxyRes: [
        function (res, req, next) {
            if (res && res.headers) {
              var setCookieHeader = res.headers['set-cookie'];
              if (setCookieHeader && setCookieHeader.toString().substring(0,25) == '.AspNet.ApplicationCookie') {
                cookie = setCookieHeader;
              }
            }
          }
        ],
        middleware: function (req, res, next) {
            if (cookie) {
              req.headers['Cookie']= cookie;
            }
            next();  
        }
   }
  }, done);
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
