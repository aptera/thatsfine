import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class Create {
    heading = 'Add A New Billable Time Entry';
    clients = [];
    selectedClient = null;
    projects = [];
    selectedProject = null;
    phases = [];
    selectedPhase = null;
    billingTypes = [];
    selectedBillingType = null;

    constructor(http) {
        http.configure(config => {
            config
                .withDefaults({
                    credentials: 'include',
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json',
                        'Cookie' : "__RequestVerificationToken=5tNNSKcVv_UazT0hqQpLBSqAnWVsjhI53mxmbsjGNFksZDt87KZazRraJOCwhVViGFYcMK8nvWFyr2auWu1y50JBWzQ1; ARRAffinity=fe0f2d105f209122aa0e2dee3a7fba9386795ae38bb5c0d6c243d74248684dcf; .AspNet.ApplicationCookie=-h4_duwSnFgqycWueut83uEM-inDf0gBsy28WgL6StkfKMBhJw8Jog3_pcWrbPkN7HZh1VkoSrgx_o8Gq3QYqw9FDyNGkWZJWxXBeeVgQMwBh9OGy1sO41ZDdk7lwTr2r0eQNoNSWm7XUmZmFqR9Rpj4GijhGc6dwIU3Oi2A5Yx2utIcqDe9ZnPpjFuzQ9WIWzQoF3PK4ibtmyH37cID1yV4VD3_EP8d22l9ROsrcPUnw870Lfh9Klt3CdYVz8fXJ7XmjY4QuM8fFHIDHa4TLHwIDySzKXCxSv6UQldcfu4kn_zcY4sU5i7ZYCnuIYn1dswjd_meWKxcUjZ8iYdlCY3L8M2SNfHwzBunbb7n72OMmVmK-9jg96ORnwxHOQAlCZfRipBIW1BWnM2-7qLTDOoOWzBKu161o6zyE2qMoMqru7xYk6IDZKfkW-2JSOK_v-QFPm-iSzj0LGvX5bx431tJzNbIpz8rNNMc0K2Kl_veKvsl; __uvt="
                    }
                })
                .withBaseUrl('https://thereisno.trystructure.com/api/v1/')
        });

        this.http = http;
    }

    activate() {
        return this.http.fetch('clients')
            .then(response => response.json())
            .then(clients => this.clients = clients);
    }
}
