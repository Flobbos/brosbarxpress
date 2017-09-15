import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { ItemDetailsPage } from '../item-details/item-details';
import { Http } from '@angular/http';
import 'rxjs/add/operator/finally';
import {ShareService} from '../services/ShareService';
import { AlertController } from 'ionic-angular';
import {OrderService} from '../services/OrderService';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
    
    items: any;
    isLoading: boolean = true;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams, 
        public orderService: OrderService,
        private http: Http,
        private shareService: ShareService,
        private alertCtrl: AlertController) {}
    
    //Navigate to details page
    itemTapped(event, item) {
        this.navCtrl.push(ItemDetailsPage, {
          item: item
        });
    }
    
    //Refresh order list
    refreshItems(refresher){
        //console.log('Refreshing!');
        this.http.get("http://brosbar.com/api/getOrders/?user_id=" + this.shareService.getUserId())
            .finally(()=> {
                if(refresher != null){
                    refresher.complete();
                }
            })
            .subscribe(data => {
                let result = data.json();
                if(result.success == true){
                    this.orderService.setOrders(result.orders); 
                    this.pushItems(result.orders);
                }
                else{
                    this.orderService.setOrders([]);
                    this.pushItems([]);
                }  
            }, error => {
                //console.log(error);// Error getting the data
                this.showErrorAlert();
            });
    }
    //Show error alert
    showErrorAlert() {
        let alert = this.alertCtrl.create({
            title: '错误!',
            subTitle: '无法从服务器加载数据',
            buttons: ['OK']
        });
        alert.present();
    }
    //Push items to variable
    pushItems(data){
        this.items = data;
        this.isLoading = false;
        //console.log('Pushing');
    }
    
    //View init
    ionViewWillEnter(){
        //Load data
        this.orderService.getOrdersPromise().then((orders)=>{
            if(orders && orders.length > 0){
                this.pushItems(orders);
            }
            else{
                this.refreshItems(null);
            }
        });
    }
      
  }
