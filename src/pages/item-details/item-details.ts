import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Clipboard } from '@ionic-native/clipboard';
@Component({
    selector: 'page-item-details',
    templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
    selectedItem: any;
    isDelivered: boolean;
    loading: any;

    constructor(public navCtrl: NavController, 
                public navParams: NavParams, 
                public http: Http, 
                public storage: Storage, 
                private iab: InAppBrowser,
                public loadingCtrl: LoadingController, 
                private clipboard: Clipboard) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
    } 
    
    openMap() {
        let address = '北京'+this.selectedItem.district+this.selectedItem.street+this.selectedItem.street_number+this.selectedItem.house_number;
        let browser = this.iab.create("http://api.map.baidu.com/geocoder?address="+address+'&output=html','_blank');
    }    
    copyAddress(){
        this.clipboard.copy('北京'+this.selectedItem.district+this.selectedItem.street+this.selectedItem.street_number+this.selectedItem.house_number);
    }
    delivered() {
        this.presentLoading();
        this.http.get("http://brosbar.com/api/updateOrder/?id=" + this.selectedItem.id)
            .finally(() => this.dismissLoading())
            .subscribe(data => {
                this.isDelivered = !this.isDelivered;
                this.storage.get('orders').then((orders) =>{
                    let orderIndex = orders.indexOf(orders.find(order => order.id == this.selectedItem.id));
                    orders.splice(orderIndex, 1);

                    console.log(orders);
                    this.storage.set('orders', orders);

                })
            }, error => {
                console.log(error);// Error getting the data
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
    
    ngOnInit() {
        console.log(this.selectedItem);
    }
}
