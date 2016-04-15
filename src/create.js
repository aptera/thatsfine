import {BindingEngine, inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient, BindingEngine)
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
    bindingEngine = null;
    subscription = null;

    constructor(http, bindingEngine) {
      this.bindingEngine = bindingEngine;
      this.clients = [];
        http.configure(config => {
            config
                .withDefaults({
                    // credentials: 'include',
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json',
                        'Cookie' : "Get Cookie From Structue, Do not Commit/Save Cookie"
                    }
                })
                .withBaseUrl('https://localhost:9001/api/v1/')
        });

        this.http = http;
        this.subscription = this.bindingEngine.propertyObserver(this, 'selectedProjectId').subscribe(this.getBillingAndPhaseType);
    }

    getBillingAndPhaseType(projectId, oldValue, model, test, test2) {
      var billingTypesUrl = 'projects/' + projectId + '/billingTypes';
      var phaseTypeUrl = 'projects/' + projectId + '/phases';
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
