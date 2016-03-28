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
            req.headers['Cookie']='__RequestVerificationToken=caYOG1-lx6QiU_XsQTLlZoQZvEPCyysvA3ELvXrI2QhQTyOgWhO0oW0s6cDFWWBxdLh0SoELYOe4PcWP9fHvXriB_jI1; .AspNet.ApplicationCookie=gMVhU6wR_zFe_bGqJlD8W63xhGefDkIN3WacH5K9e41uzUuQU6jEQzLp9MMrH4151oYVBnN2UDgiDqzlV0_9bKNSDJxvqjy3OpdgcuMGrf3ZL-7QDx5D9dOUkfs_QqM6mK1XxzmBxa8N7o586h3xx8ubG5-iguk0Od9IvgwHOM_nM0PkNKqDQEO8PDEKEnQfYUtvn5rDQzyvzPc_T-XUGd3gkU8XErgx7TO0JyQ7qwDN0PNfjkG9GAbexYtlokfGFtL48i_ZFOfVWkm6TOb0l76VpS6pCTTnA0XTzlHD5mWTuVn7XG9R5XNNVhCSTSfgqrzSlgwDkO0p2GqMt9zaC2ENDgE_CUHzRg7NkJFDZKwjNZTb0EoRjid22NgS_MkRs8ki1UfD-IeNOrFX2eYfA94PRdjJOA18CEyXFd9OWL3ZPhazME0W1qgOT1ZwymT9kdaSPiSrS4v019DnzshaUbn0zfQY1N0xVz7x2P0SeSeea1ghPtVqmkjRTPfj4fR8W9_SK_JHpGQeydJOW_w941M24dGyyV6-46scmWnOWghCSgKZQZeDISG_NHLO5iaquqU2JAQ5M0ftfulSPR4vSrMdzbt886HpTXOiFIv6nG5tU730m6NGF7GF2_GeCfWFpSPvTw; __uvt=';
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
