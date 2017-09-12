import { Component } from '@angular/core';

import { NavController, NavParams} from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';

import { Storage } from '@ionic/storage';

import { Http } from '@angular/http';

import 'rxjs/add/operator/finally';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icons: string[];
  items: any;
  user: {};
  menuIsHidden: boolean = false;

  constructor(
                public navCtrl: NavController, 
                public navParams: NavParams, 
                public storage: Storage,
                private http: Http,) {
    this.user = this.storage.get('user');
    //console.log(this.user);
  }

    itemTapped(event, item) {
        this.navCtrl.push(ItemDetailsPage, {
          item: item
        });
    }
    
    refreshItems(refresher){
        console.log('Refreshing!');
        console.log(refresher);
        this.http.get("http://brosbar.com/api/getOrders/?user_id="+4216)
            .finally(()=> {
                if(refresher != null)
                    refresher.complete()
            })
            .subscribe(data => {
                let nutte = data.json();
                if(nutte.success == true){ 
                    this.pushItems(nutte.orders);
                }
                else{
                    this.storage.set('orders',null);
                    this.pushItems([]);
                }  
            }, error => {
                console.log(error);// Error getting the data
            });
    }
  
    pushItems(data){
        this.storage.set('orders', data);
        this.items = data;
        console.log('Pushing');
    }
    
    // ngOnInit(){
    //     this.storage.get('orders').then(data => {
    //         console.log(data);
    //         if(data !== null){
    //             this.pushItems(data);
    //         }
    //         else{
    //             console.log('Refreshing');
    //             this.refreshItems();
    //         }
    //     });
    // }

    ionViewWillEnter(){
        //Load data
        this.storage.get('orders').then(data => {
            console.log(data);
            if(data !== null){
                this.pushItems(data);
            }
            else{
                console.log('Refreshing');
                this.refreshItems(null);
            }
        });
    }
      
  }
