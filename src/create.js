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
    hours = null;
    minutes = null;
    description = null;

    constructor(http, observerLocator) {
      this.clients = [];
        http.configure(config => {
            config
                .withDefaults({
                    // credentials: 'include',
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json'
                    }
                })
                .withBaseUrl('https://localhost:9001/api/v1/')
        });

        this.http = http;
        observerLocator.getObserver(this, 'selectedProjectId').subscribe((newValue, oldValue) => this.getBillingAndPhaseType(newValue));
    }

    getBillingAndPhaseType(projectId) {
        if (projectId == null) {
            return;
        }
      var billingTypesUrl = 'projects/' + projectId + '/roles';
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

    addBillableTimeEntry() {
        var timeEntry = {
            "Id": 0,
            "ClientName": this.selectedClientName,
            "ProjectId": this.selectedProjectId,
            "PhaseId": this.selectedPhase,
            "Hours": this.hours,
            "Minutes": this.minutes,
            "Description": this.description,
            "ProjectRoleName": this.selectedBillingType,
            "Date": new Date().toLocaleDateString()
        };
        
        this.http.fetch('time/billable', {
            method: 'post',
            body: JSON.stringify(timeEntry)
        });
        // .then(response => response.json())
        //   .then(billableTimeEntryId => this.router.navigate('view/' + billableTimeEntryId));
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
