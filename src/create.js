import {inject} from 'aurelia-framework';
import {ObserverLocator} from 'aurelia-binding';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient, ObserverLocator)
export class Create {
    heading = 'Add A New Billable Time Entry';
    clients = [];
    selectedClientName = null;
    projects = [];
    filteredProjects = [];
    selectedProjectId = null;
    phases = [];
    selectedPhase = null;
    billingTypes = [];
    selectedBillingType = null;
    subscription = null;

    constructor(http, observerLocator) {
      this.clients = [];
        http.configure(config => {
            config
                .withDefaults({
                    //credentials: 'include',
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json'
                    }
                })
                .withBaseUrl('https://localhost:9001/api/v1/')
        });

        this.http = http;
        observerLocator.getObserver(this, 'selectedProjectId').subscribe(this.getBillingAndPhaseType.apply(this, arguments));
    }

    getBillingAndPhaseType(newValue, oldValue) {
      var billingTypesUrl = 'projects/' + this.selectedProjectId + '/projectroles';
      var phaseTypeUrl = 'projects/' + this.selectedProjectId + '/phases';
      this.billingTypes = [];
      this.phases = [];
      this.http.fetch(billingTypesUrl)
            .then(response => response.json())
            .then(billingTypes => this.billingTypes = billingTypes)
            .then(this.http.fetch(phaseTypeUrl)
                   .then(response => response.json())
                   .then(phases => this.phases = phases)
            );
    }

    activate() {
        return this.http.fetch('clients?onlyActive=true')
            .then(response => response.json())
            .then(clients => this.clients = clients)
            .then(this.http.fetch('projects')
                  .then(response => response.json())
                  .then(projects => this.projects = projects)
            );
    }
}
