import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {NavController, NavParams} from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Clipboard } from '@ionic-native/clipboard';
import { AlertController } from 'ionic-angular';
import {ListPage} from '../list/list';
import {LoaderService} from '../services/LoaderService';
import {OrderService} from '../services/OrderService';
import {Order} from '../../app/models/order';

@Component({
    selector: 'page-item-details',
    templateUrl: 'item-details.html',
    providers: [LoaderService]
})
export class ItemDetailsPage {
    selectedItem: Order;
    loading: any;

    constructor(public navCtrl: NavController, 
                public loaderService: LoaderService,
                public navParams: NavParams, 
                public http: Http, 
                public orderService: OrderService, 
                private iab: InAppBrowser,
                private clipboard: Clipboard,
                private alertCtrl: AlertController) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        //console.log(this.selectedItem);
    } 
    
    openMap() {
        this.iab.create("http://api.map.baidu.com/geocoder?address=" + this.orderService.getAddress(this.selectedItem)+'&output=html','_blank');
    }    
    copyAddress(){
        this.clipboard.copy(this.orderService.getAddress(this.selectedItem));
    }
    delivered() {
        this.loaderService.presentLoading();
        this.http.get("http://brosbar.com/api/updateOrder/?id=" + this.selectedItem.id)
            .finally(() => {
                this.loaderService.dismissLoading();
                
            })
            .subscribe(data => {
                //this.orderService.removeOrder(this.selectedItem.id);
                this.orderService.removeOrder(this.selectedItem.id).then(()=>{
                    this.navCtrl.setRoot(ListPage);
                });
                /*this.orderService.getOrdersPromise().then((orders)=>{
                    let new_orders = this.orderService.spliceOrders(this.selectedItem.id,orders);
                    this.orderService.setOrders(new_orders);
                    
                });*/
                //this.navCtrl.setRoot(ListPage);
            }, error => {
                console.log(error);// Error getting the data
            });
    }
    showConfirm() {
        let confirm = this.alertCtrl.create({
            title: '订单完成?',
            message: '你确定要把这张订单标记为完成吗？',
            buttons: [
            {
                text: '不要',
                handler: () => {
                  //console.log('Disagree clicked');
                }
            },
            {
                text: '要',
                handler: () => {
                    this.delivered();
                }
            }
          ]
        });
        confirm.present();
    }
    
}
