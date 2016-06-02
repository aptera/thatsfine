import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';

@inject(HttpClient, Router)
export class login {
    userName = null;
    password = null;
    
    constructor(http, router) {
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
        this.router = router;
    }
    
    login() {
        var timeInformation = {
            'username': this.userName,
            'password': this.password
        }
        return this.http.fetch('login', {
            method: 'post',
            body: JSON.stringify(timeInformation)
        }).then(() => this.router.navigate('billableEntries'))
    }
}