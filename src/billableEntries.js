import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

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
                .withBaseUrl('https://localhost:9001/api/v1/')
        });

        this.http = http;
    }

  activate() {
     console.log("starting activate")

     return this.http.fetch('time/billable/ajkarnitis@apterainc.com?fromDate=2016-05-01&toDate=2016-05-31')
            .then(response => response.json())  
            // .then(data => console.log(data))          
            .then(
                data => this.entries = data
                )
            .catch(error => console.log(error));


   }
}