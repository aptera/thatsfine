import {inject} from 'aurelia-framework';
<<<<<<< HEAD
import {HttpClient} from 'aurelia-fetch-client';
//import 'fetch';
=======
import {ObserverLocator} from 'aurelia-binding';
import {Router} from 'aurelia-router';
import {API} from './api';
>>>>>>> createBillableTimeEntry

@inject(ObserverLocator, Router, API)
export class Create {
    heading = 'Add A New Billable Time Entry';
    clients = [];
<<<<<<< HEAD
    projects = [];
=======
    selectedClientName = null;
    projects = [];
    filteredProjects = [];
    selectedProjectId = null;
>>>>>>> createBillableTimeEntry
    phases = [];
    billingTypes = [];
<<<<<<< HEAD

    constructor(http) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('https://thereisno.trystructure.com/api/v1/')
        });
=======
    selectedBillingType = null;
    hours = null;
    minutes = null;
    description = null;

    constructor(observerLocator, router, api) {
        this.clients = [];
        observerLocator.getObserver(this, 'selectedProjectId').subscribe((newValue, oldValue) => this.getBillingAndPhaseType(newValue));
        this.router = router;
        this.api = api;
    }
    
    // without API refactoring
    // getBillingAndPhaseType(projectId) {
    //     if (projectId == null) {
    //         return;
    //     }
    //   var billingTypesUrl = 'projects/' + projectId + '/roles';
    //   var phaseTypeUrl = 'projects/' + projectId + '/phases';
    //   this.billingTypes = [];
    //   this.phases = [];
    //   this.http.fetch(billingTypesUrl)
    //         .then(response => response.json())
    //         .then(billingTypes => this.billingTypes = billingTypes)
    //         .then(this.http.fetch(phaseTypeUrl)
    //                .then(response => response.json())
    //                .then(phases => this.phases = phases)
    //         );
    // }

    // with API refactoring
    getBillingAndPhaseType(projectId) {
        if (projectId == null) {
            return;
        }

      this.billingTypes = [];
      this.phases = [];
      this.api.getBilingTypesAsJSON(projectId)
        .then(billingTypes => this.billingTypes = billingTypes)
        .then(this.api.getPhasesAsJSON(projectId)
                .then(phases => this.phases = phases));
    }
>>>>>>> createBillableTimeEntry

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
        
        this.api.addBillableTimeEntry(timeEntry)
            .then(newBillableTimeEntryId => this.router.navigate('view/' + newBillableTimeEntryId));
        
        // without API refactoring
        // this.http.fetch('time/billable', {
        //     method: 'post',
        //     body: JSON.stringify(timeEntry)
        // }).then(response => response.text())
        //    .then(billableTimeEntryId => this.router.navigate('view/' + billableTimeEntryId));
    }

<<<<<<< HEAD
    activate() {
        //return this.http.fetch('clients')
        //    .then(response => response.json())
        //    .then(clients => this.clients = clients);
=======
    // without API refactoring
    // activate() {
    //     return this.http.fetch('clients?onlyActive=true')
    //         .then(response => response.json())
    //         .then(clients => this.clients = clients)
    //         .then(this.http.fetch('projects')
    //               .then(response => response.json())
    //               .then(projects => this.projects = projects)
    //         );
    // }
    
    // with API refactoring
    activate(){
        return this.api.getActiveClientsAsJSON()
            .then(clients => this.clients = clients)
            .then(this.api.getProjectsAsJSON()
                    .then(projects => this.projects = projects));   
>>>>>>> createBillableTimeEntry
    }
}