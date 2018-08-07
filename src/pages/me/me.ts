import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativeService } from '../../providers/NativeService';
import { HttpService } from '../../providers/HttpService';
import { PrivacyPage } from './privacy/privacy'

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
    privacy() {
        this.navCtrl.push(PrivacyPage)
    }
    logout() {
        return this.native.confirm("提示","确定要退出登录吗？",function() {
            console.log("已退出!")
        });
    }
}