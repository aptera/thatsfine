import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

@inject(HttpClient)
export class SignIn {

    loginName = "ajkarnitis@apterainc.com";
    password = "P@ssword2";
    rememberMe = true;

    constructor(http) {
        http.configure(config => {
            config
                .withDefaults({
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .withBaseUrl('https://localhost:9001/api/v1/')
        });

        this.http = http;
    }

    logIn() {
        let body = json({
            "username": this.loginName,
            "password": this.password,
            "remember": this.rememberMe
        });

        return this.http.fetch('login', {
            method: "post",
            headers: {
                "Access-Control-Allow-Credentials": true
            },
            body: body
        })
            .then(response => {
                return response.json();
            })
            .then(response => {
                console.log("Login Response: " + response);

            });
    }

    logOut() {
        return this.http.fetch('login', {
            method: "delete"
        })
            .then(response => {
                console.log("Logout Response: " + response);
            });
    }
}
