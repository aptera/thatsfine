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
      this.clients = [];
        http.configure(config => {
            config
                .withDefaults({
                    credentials: 'include',
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json',
                        'Cookie' : "__RequestVerificationToken=sCKhMXURVaVt6K9EJia6ysOxO_1hh3u7S6LptAIJ9arhVe_kmRqVIdTmax-gZBTZamzYEdi3hLFXtSKT4wPqWDjmbmo1; ARRAffinity=4b1f17a64743ea29e40334ecb4ceae81cccac01aba1e3e5845861c5314d560af; .AspNet.ApplicationCookie=Cu39T3iYpyezzSKdYt0z7HBMeF7zIdz4pRTXK9Zrc6gsZdVaJA0G_Y20hmYv_2ztfxKwpPmO1wOlMG-hG9PIIAetlai9O9oTR8Sht-0_cGX3eTjJ_Wc_0kRYE4tUEhUR3uohyWL73wmUwJggITGVsbxZlaupIweya2GHM-6nrTaTFk-TpV1zdOQCwfacdUcPLKFFkA_HCkkpqi16RmiYQg-nZEsNtPib9GswodpmaHmna1eiwQmsBkjLI6Ozai2L96ew5u_HIlgrFqBwAWrnmoEje7Rb6zyYZVJnqIVQ-XoYS3Sxp2dE7YejpH5Ab8ab6qyOaGxBj274CV83aak8PSRMQEDi_No1zbzoIso4fqlLbQZnsr0jUibqM38D3b-c-P60u-UKF6f11YhRgTbukvFe4EzyZvnP2pTcw_r3VxDDV6g4gEvRbMNO3X79f2y87J6hi3URjVAQlGfgD2mX5rQ_2pwFp2EnPyxgX19aY4iGCQEF; __uvt="
                    }
                })
                .withBaseUrl('https://localhost:9001/api/v1/')
                 //.withBaseUrl('https://thereisno.trystructure.com/api/v1/')
        });

        this.http = http;
    }

    activate() {
        return this.http.fetch('clients')
            .then(
              response => response.json()
            )
            .then(
              clients => this.clients = clients
            );
    }
}
