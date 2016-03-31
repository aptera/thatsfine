export class App {
    configureRouter(config, router) {
        config.title = 'Aurelia';
        config.map([
            { route: ['', 'signin'], name: 'signin', moduleId: 'signin', nav: true, title: 'Sign In' },
            { route: 'create', name: 'create', moduleId: 'create', nav: true, title: 'Create' }
        ]);

        this.router = router;
    }
}
