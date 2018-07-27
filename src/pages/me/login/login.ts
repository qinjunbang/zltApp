import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativeService } from '../../../providers/NativeService';
import { HttpService } from '../../../providers/HttpService';
import { ShopsListPage } from '../../shops/shops-list/shops-list';


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
    public http: HttpService

  ) {

  }


  // 点击登录
  login () {
    this.navCtrl.push(ShopsListPage);
    let data = {};
    data['name'] = this.name;
    data['password'] = this.password;

    if (data['name']) {
      return this.native.showToast("用户名不能为空~");
    } else if (!data['password']) {
      return this.native.showToast("密码不能为空~");
    }

     this.http.post('/login', data).subscribe(res => {
       console.log("res", res);
     });
  }

}
