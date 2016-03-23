import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
//import 'fetch';

@inject(HttpClient)
export class Create {
    heading = 'Add A New Billable Time Entry';
    clients = [];
    projects = [];
    phases = [];
    billingTypes = [];

    constructor(http) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('https://thereisno.trystructure.com/api/v1/')
        });

        this.http = http;
    }

    activate() {
        //return this.http.fetch('clients')
        //    .then(response => response.json())
        //    .then(clients => this.clients = clients);
    }
}