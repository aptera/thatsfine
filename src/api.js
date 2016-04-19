import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class API {
    
    constructor(http) {
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
    }
    
    getBilingTypesAsJSON(projectId) {
      var billingTypesUrl = 'projects/' + projectId + '/roles';

      return this.http.fetch(billingTypesUrl)
            .then(response => response.json());
    }
    
    getPhasesAsJSON(projectId) {
        var phaseTypeUrl = 'projects/' + projectId + '/phases';
        
        return this.http.fetch(phaseTypeUrl)
                .then(response => response.json())
    }
    
    getActiveClientsAsJSON() {
        return this.http.fetch('clients?onlyActive=true')
            .then(response => response.json());
    }
    
    getProjectsAsJSON() {
        return this.http.fetch('projects')
            .then(response => response.json());
    }
    
    addBillableTimeEntry(timeEntry){
        return this.http.fetch('time/billable', {
             method: 'post',
             body: JSON.stringify(timeEntry)
        }).then(response => response.text());
    }
}