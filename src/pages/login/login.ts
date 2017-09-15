import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Headers, Http} from '@angular/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {checkFirstCharacterValidator} from '../validators/customValidators';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/finally';
//pages
import {ListPage} from "../list/list";
//Services
import {ShareService} from '../services/ShareService';
import {LoaderService} from '../services/LoaderService';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
    providers: [LoaderService]
})
export class LoginPage {
    authForm: FormGroup;
    loading: any;
    showLogin: boolean = true;
    username: string = '';
    password: string = '';

    constructor(public loaderService: LoaderService,
                public navCtrl: NavController,
                private http: Http,
                private fb: FormBuilder,
                public storage: Storage,
                private shareService: ShareService) {
        this.authForm = fb.group({
            'username': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20)])],
            'password': [null, Validators.compose([Validators.required, Validators.minLength(8), checkFirstCharacterValidator(/^\d/i)])],
        });
    }

    submitForm(value: any): void {
        this.loaderService.presentLoading();
        this.postRequest(value);
    }

    postRequest(value: any): void {
        //setTimeout(this.hideLoading(),8000);
        let headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json');
        
        // let options = new RequestOptions({ headers: headers });

        let postParams = {
            username: value.username,
            password: value.password,
        };

        this.http.post('http://brosbar.com/api/authApp', postParams, {headers: headers})
            .map(res => res.json())
            .finally(() => this.loaderService.dismissLoading())
            .subscribe(data => {
                let user = data.data;
                console.log(user);
                if (user.user_id != null) {
                    this.storage.set('user', user);
                    this.shareService.setData(user);
                    this.navCtrl.setRoot(ListPage);
                }

            }, error => {
                
            });
    }

}
