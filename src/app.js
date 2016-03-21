export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: 'welcome',      nav: true, title: 'Welcome' },
      { route: 'create', name: 'create',      moduleId: 'create',      nav: true, title: 'Create' }
    ]);

    this.router = router;
  }
}
