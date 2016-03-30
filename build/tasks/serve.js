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
    https: false,
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
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            req.headers['Cookie']='__RequestVerificationToken=iL6NH0Gaw3FXoONyF4ZvhMwON64j6Z5UrQVpF_-y-FoVOyhjzsK3pR1oFAS_bO1hvxEiklwoXFRd-_WaNR0fjvO15GU1; ARRAffinity=4b1f17a64743ea29e40334ecb4ceae81cccac01aba1e3e5845861c5314d560af; .AspNet.ApplicationCookie=WxYeODq0XYGWqIXGAjIn2HCrLHQmhVgW4AxSw4ET561zfePR3654u76TWyvnJ2pTBh6s6BVGjE0sE-L-b3y4qojSpj8u_Ae923XKBwHplyg57elRb4PAXA5zRQljy3MnxyPrVKmy6yUhwmdR5Wf6rVIMPhPty2HZN1JlzwVJl_juz2QRoLBxgvP1YjzFvxBLEJTNS9tPN5FgACxOJxeiR9vQ-77eEOXtQjDWuBkdaAmmiy1utsBU76czp3u0aLLToz2TyJN8hyHMwgT4QOaxdSxijH1mDic4QtaOemDheC6UWV_acGy3pSVqWqcrXyJXRQEfXwX3a6lJxN2UFBwCk6Ho28R4gOrUTZdL6g9a_SEXcWtpex0lGnBvRpi42EscnJscwN3-FDTMsFA94OUUTArKOLF-JmbyJp-I-KpDUk930P5N37VzwsmCfpII5JpeUeHKfxi_tqcLaCAlYKiuwLkfD6VV_uKIllv2AJq56NWIbXLN; __uvt=';
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
