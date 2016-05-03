export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'hello'], name: 'hello',      moduleId: 'hello',      nav: true, title: 'Hello' }
    ]);

        this.router = router;
    
  }
  
}