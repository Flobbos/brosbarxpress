import {LoadingController} from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class LoaderService{
    
    public loading: any;
    
    constructor(private loadingCtrl: LoadingController){}
    
    public presentLoading(message: string = '') {
        let displayMsg = message;
        if(displayMsg.length == 0){
            displayMsg = "Please wait...";
        }
        this.loading = this.loadingCtrl.create({
            content: displayMsg,
            dismissOnPageChange: true
        });
        this.loading.present();
    }
    
    public dismissLoading() {
        this.loading.dismiss();
    }
    
}