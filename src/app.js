export class App {
<<<<<<< HEAD
    configureRouter(config, router) {
        config.title = 'Aurelia';
        config.map([
            { route: ['', 'signin'], name: 'signin', moduleId: 'signin', nav: true, title: 'Sign In' },
            { route: 'create', name: 'create', moduleId: 'create', nav: true, title: 'Create' }
        ]);
=======
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: 'welcome',      nav: true, title: 'Welcome' },
      { route: 'create', name: 'create',      moduleId: 'create',      nav: true, title: 'Create' },
      { route: 'view/:id', name: 'view', moduleId: 'view', nav: false, title: 'View'}
    ]);
>>>>>>> createBillableTimeEntry

        this.router = router;
    }
}
