import {Component} from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import {Headers, Http} from '@angular/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {checkFirstCharacterValidator} from '../validators/customValidators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Storage} from '@ionic/storage';
import {ListPage} from "../list/list";

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    authForm: FormGroup;
    loading: any;
    showLogin: boolean = true;
    username: string = '';
    password: string = '';
    user = {
        user_id: null,
        username: null,
        token: null
    }

    constructor(public loadingCtrl: LoadingController,
                public navCtrl: NavController,
                private http: Http,
                private fb: FormBuilder,
                public storage: Storage) {
        this.authForm = fb.group({
            'username': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20)])],
            'password': [null, Validators.compose([Validators.required, Validators.minLength(8), checkFirstCharacterValidator(/^\d/i)])],
        });
    }

    submitForm(value: any): void {
        console.log('Form submited!')
        console.log(value);
        this.presentLoading();
        this.postRequest(value);
    }

    postRequest(value: any) {
        //setTimeout(this.hideLoading(),8000);
        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json');
        // let options = new RequestOptions({ headers: headers });

        let postParams = {
            username: value.username,
            password: value.password,
        };

        this.http.post('http://brosbar.com/api/authApp', postParams, {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                var user = data.data;
                if (user.user_id != null) {
                    this.storage.set('user', user);
                    this.navCtrl.setRoot(ListPage);
                } else {
                    this.dismissLoading();
                }

            }, error => {
                this.dismissLoading();
                console.log('post error');
                console.log(error);
            });
    }

    private presentLoading() {
        this.loading = this.loadingCtrl.create({
            content: "Please wait...",
            dismissOnPageChange: true
        });
        this.loading.present();
    }

    private dismissLoading() {
        this.loading.dismiss();
    }
}
