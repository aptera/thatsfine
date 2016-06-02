export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'login'], name: 'login', moduleId:'login', nav: true, title: 'Login'},
      { route: 'hello', name: 'hello',      moduleId: 'hello',      nav: true, title: 'Hello' },
      { route: 'billableEntries', name: 'billableEntries',      moduleId: 'billableEntries',      nav: true, title: 'billable Entries' }
    ]);

        this.router = router;
    
  }
  
}