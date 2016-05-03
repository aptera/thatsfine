

export class BillableEntries {
  heading = 'Billable Time Entries';
  entries = [];

  constructor() {

  }

  activate() {
     console.log("starting activate")

    this.entries = [
                {
                    "Id": 392049,
                    "ClientName": "Aptera Software",
                    "ProjectId": 52626,
                    "ProjectName": "Corporate Website",
                    "ProjectNumber": "0222",
                    "PhaseName": "New Web Additions",
                    "PhaseId": 281358,
                    "ProjectRoleName": "Default-BillingType",
                    "Hours": 2,
                    "Minutes": 0,
                    "Description": "test",
                    "Date": "2016-04-20T00:00:00",
                    "LoggedOn": "2016-04-20T21:07:52.3504956+00:00",
                    "LoggedByUserName": "ajkarnitis@apterainc.com",
                    "IsInvoiced": false,
                    "Status": null
                },
                {
                    "Id": 424686,
                    "ClientName": "Aptera Software",
                    "ProjectId": 52626,
                    "ProjectName": "Corporate Website",
                    "ProjectNumber": "0222",
                    "PhaseName": "New Web Additions",
                    "PhaseId": 281358,
                    "ProjectRoleName": "Default-BillingType",
                    "Hours": 8,
                    "Minutes": 0,
                    "Description": "slept",
                    "Date": "2016-04-25T00:00:00",
                    "LoggedOn": "2016-04-26T14:39:03.9711302+00:00",
                    "LoggedByUserName": "ajkarnitis@apterainc.com",
                    "IsInvoiced": false,
                    "Status": null
                }
            ];  


   }
}