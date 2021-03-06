import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Storage} from '@ionic/storage';
import {ShareService} from '../pages/services/ShareService';


@Component({
    templateUrl: 'app.html',
    providers: [ShareService]
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage;
    pages: Array<{title: string, component: any}>;

    constructor(
        public platform: Platform,
        public menu: MenuController,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen,
        public storage: Storage,
        private shareService: ShareService
    ) {
        this.initializeApp();

        // set our app's pages
        this.pages = [
            { title: '订单列表', component: ListPage },
            { title: '个人信息', component: ProfilePage },
        ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        this.statusBar.styleDefault();
        this.splashScreen.hide();

        this.storage.get('user').then((val) =>{
            if(val != null && val.user_id != null){
                this.shareService.setData(val);
                this.rootPage = ListPage;
            }else{
                this.rootPage = LoginPage;
            }
    });

    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
