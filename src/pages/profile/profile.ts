import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import {ShareService} from '../services/ShareService';
import {OrderService} from '../services/OrderService';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
    
    constructor(
        private orderService: OrderService, 
        private navCtrl: NavController, 
        private shareService: ShareService,
        private storage: Storage) {}
    
    getUsername(){
        return this.shareService.getUserName();
    }
    
    getUserId(){
        return this.shareService.getUserId();
    }
    
    getToken(){
        return this.shareService.getToken();
    }
    
    logout(){
        this.orderService.removeAllOrders();
        this.shareService.setDataToNull();
        this.storage.set('user',null);
        this.navCtrl.push(LoginPage);
    }
}