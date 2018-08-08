import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NativeService } from '../../../providers/NativeService';
import { HttpService } from '../../../providers/HttpService';
import { ShopsListPage } from '../../shops/shops-list/shops-list';
import { ShopsManagePage } from '../../shops/shops-manage/shops-manage';
import { MePage } from '../../me/me';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public name:string = ''; // 用户名
  public password:string = ''; // 密码

  constructor(
    public navCtrl: NavController,
    public native: NativeService,
    public http: HttpService,
    public storage: Storage

  ) {
      //this.login();
  }



  // 点击登录
  login () {
    // this.navCtrl.push(ShopsListPage);
    let data = {};
    data['mobile'] = this.name;
    data['password'] = this.password;
    data['device_id'] = this.getMyUid() || 'b24c3f95b198268';

    if (!data['mobile']) {
      return this.native.showToast("用户名不能为空~");
    } else if (!data['password']) {
      return this.native.showToast("密码不能为空~");
    }

    this.http.post('/api/app/login', data).subscribe(res => {
     console.log("res", res);
     if (res.code == 200) {
       this.native.showToast(res.info);
       res.data.token && this.storage.set("token", res.data.token);
       res.data.shopclerk && this.storage.set("userInfo", res.data.shopclerk);
       this.navCtrl.push(MePage);
     } else {
       this.native.alert(res.info);
     }

    });
  }

  // 获取设备UUID
  getMyUid () {
    let uuid = this.native.getUid();

    return uuid;
  }

  // 页面跳转
  goToPage () {
    this.navCtrl.push(ShopsManagePage, {});
  }

}
