import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativeService } from '../../providers/NativeService';
import { HttpService } from '../../providers/HttpService';
import { PrivacyPage } from './privacy/privacy';
import { WePage } from './we/we'
import { WalletPage } from './wallet/wallet'

@Component({
    selector: 'page-me',
    templateUrl: 'me.html'
})

export class MePage {

    constructor(
        public native: NativeService,
        public navCtrl: NavController
    ) {

    }
    wallet() {
        this.navCtrl.push(WalletPage) 
    }
    privacy() {
        this.navCtrl.push(PrivacyPage)
    }
    we() {
        this.navCtrl.push(WePage)
    }
    logout() {
        return this.native.confirm("提示","确定要退出登录吗？",function() {
            console.log("已退出!")
        });
    }
}