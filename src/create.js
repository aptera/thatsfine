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
                    credentials: 'include',
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json',
                        'Cookie' : "__RequestVerificationToken=iL6NH0Gaw3FXoONyF4ZvhMwON64j6Z5UrQVpF_-y-FoVOyhjzsK3pR1oFAS_bO1hvxEiklwoXFRd-_WaNR0fjvO15GU1; ARRAffinity=4b1f17a64743ea29e40334ecb4ceae81cccac01aba1e3e5845861c5314d560af; .AspNet.ApplicationCookie=WxYeODq0XYGWqIXGAjIn2HCrLHQmhVgW4AxSw4ET561zfePR3654u76TWyvnJ2pTBh6s6BVGjE0sE-L-b3y4qojSpj8u_Ae923XKBwHplyg57elRb4PAXA5zRQljy3MnxyPrVKmy6yUhwmdR5Wf6rVIMPhPty2HZN1JlzwVJl_juz2QRoLBxgvP1YjzFvxBLEJTNS9tPN5FgACxOJxeiR9vQ-77eEOXtQjDWuBkdaAmmiy1utsBU76czp3u0aLLToz2TyJN8hyHMwgT4QOaxdSxijH1mDic4QtaOemDheC6UWV_acGy3pSVqWqcrXyJXRQEfXwX3a6lJxN2UFBwCk6Ho28R4gOrUTZdL6g9a_SEXcWtpex0lGnBvRpi42EscnJscwN3-FDTMsFA94OUUTArKOLF-JmbyJp-I-KpDUk930P5N37VzwsmCfpII5JpeUeHKfxi_tqcLaCAlYKiuwLkfD6VV_uKIllv2AJq56NWIbXLN; __uvt="
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
