import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NativeService } from '../../providers/NativeService';
import { HttpService } from '../../providers/HttpService';
import { PrivacyPage } from './privacy/privacy';
import { WePage } from './we/we'
import { WalletPage } from './wallet/wallet'
import { LoginPage } from './login/login'

@Component({
    selector: 'page-me',
    templateUrl: 'me.html'
})

export class MePage {

    constructor(
        public native: NativeService,
        public navCtrl: NavController,
        public storage: Storage,
        public http: HttpService
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
        let data = {};
        let that = this;
        this.storage.get('token').then((val) => {
            data['token'] = val
        });
        return that.native.confirm("提示","确定要退出登录吗？",function() {
            console.log("我要退出!")
            that.http.post('/api/app/logout',data).subscribe(res => {
                console.log(res)
                if(res.code == 200){
                    that.native.showToast(res.info);
                    that.storage.remove('token');
                    that.navCtrl.push(LoginPage)
                }else{
                    that.native.alert('提示',' ',res.info)
                }
            })
        });
    }
}