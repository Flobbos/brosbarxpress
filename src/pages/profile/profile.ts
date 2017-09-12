import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
    
    profile: {
        username: '',
        user_id: '',
        token: ''
    };
    
    constructor(private storage: Storage, private navCtrl: NavController) {
        this.storage.get('user').then(data => {
            
            this.profile = data;
            console.log(this.profile);
        });
    }
    
    logout(){
        this.storage.set('user',null);
        this.navCtrl.push(LoginPage);
    }
}