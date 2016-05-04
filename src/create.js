import {inject} from 'aurelia-framework';
import {ObserverLocator} from 'aurelia-binding';
import {Router} from 'aurelia-router';
import {API} from './api';

@inject(API, ObserverLocator, Router)
export class Create {
    heading = 'Add A New Billable Time Entry';
    clients = [];
    selectedClientName = null;
    projects = [];
    selectedProjectId = null;
    phases = [];
    selectedPhase = null;
    billingTypes = [];
    selectedBillingType = null;
    hours = null;
    minutes = null;
    description = null;
    
    constructor(api, observerLocator, router) {
        this.api = api;

        observerLocator.getObserver(this, 'selectedProjectId').subscribe((newValue, oldValue) => this.getBillingAndPhaseType(newValue));

        this.router = router;
    }
    
    getBillingAndPhaseType(projectId) {
        if (projectId == null) return;
        
        this.billingTypes = [];
        this.phases = [];
        
        this.api.getBillingTypesAsJSON(projectId)
            .then(billingTypes => this.billingTypes = billingTypes)
            .then(this.api.getPhasesAsJSON(projectId)
                .then(phases => this.phases = phases));
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
        
        this.api.addBillableTimeEntry(timeEntry)
            .then(() => this.router.navigate('billableEntries'));
    }
    
    activate() {
        return this.api.getActiveClientAsJSON()
            .then(clients => this.clients = clients)
            .then(this.api.getProjectsAsJSON()
                .then(projects => this.projects = projects)
            );
    }
}