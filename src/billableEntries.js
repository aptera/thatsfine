import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
//import 'fetch';

@inject(HttpClient)
export class BillableEntries {
  heading = 'Billable Time Entries';
  entries = [];

     constructor(http) {
        http.configure(config => {
            config
                .withDefaults({
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json'
                    }
                })
                .withBaseUrl('https://thereisno.trystructure.com/api/v1/')
        });

        this.http = http;
    }

  activate() {
     console.log("starting activate")

     return this.http.fetch('time/billable/ajkarnitis@apterainc.com?fromDate=2016-05-01&toDate=2016-05-31')
            .then(response => response.json())            
            .then(data => this.entries == data)
            .catch(error => console.log(error));

    // this.entries = [
    //             {
    //                 "Id": 392049,
    //                 "ClientName": "Aptera Software",
    //                 "ProjectId": 52626,
    //                 "ProjectName": "Corporate Website",
    //                 "ProjectNumber": "0222",
    //                 "PhaseName": "New Web Additions",
    //                 "PhaseId": 281358,
    //                 "ProjectRoleName": "Default-BillingType",
    //                 "Hours": 2,
    //                 "Minutes": 0,
    //                 "Description": "test",
    //                 "Date": "2016-04-20T00:00:00",
    //                 "LoggedOn": "2016-04-20T21:07:52.3504956+00:00",
    //                 "LoggedByUserName": "ajkarnitis@apterainc.com",
    //                 "IsInvoiced": false,
    //                 "Status": null
    //             },
    //             {
    //                 "Id": 424686,
    //                 "ClientName": "Aptera Software",
    //                 "ProjectId": 52626,
    //                 "ProjectName": "Corporate Website",
    //                 "ProjectNumber": "0222",
    //                 "PhaseName": "New Web Additions",
    //                 "PhaseId": 281358,
    //                 "ProjectRoleName": "Default-BillingType",
    //                 "Hours": 8,
    //                 "Minutes": 0,
    //                 "Description": "slept",
    //                 "Date": "2016-04-25T00:00:00",
    //                 "LoggedOn": "2016-04-26T14:39:03.9711302+00:00",
    //                 "LoggedByUserName": "ajkarnitis@apterainc.com",
    //                 "IsInvoiced": false,
    //                 "Status": null
    //             }
    //         ];  


   }
}