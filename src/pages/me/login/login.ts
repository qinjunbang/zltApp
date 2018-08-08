import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NativeService } from '../../../providers/NativeService';
import { HttpService } from '../../../providers/HttpService';
import { ShopsManagePage } from '../../shops/shops-manage/shops-manage';
import { MePage } from '../../me/me';
import { TabsPage } from '../../tabs/tabs';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public name:string = ''; // 用户名
  public password:string = ''; // 密码
  public code: string = ''; // 验证码
  public login_type: string = 'userName'; // 默认账号密码登录
  public timer; // 计时器
  public btnText: string = '获取验证码'; // 发送验证码文案

  constructor(
    public navCtrl: NavController,
    public native: NativeService,
    public http: HttpService,
    public storage: Storage

  ) {

  }



  // 点击登录
  login () {
    // this.navCtrl.push(ShopsListPage);
    let data = {};
    data['mobile'] = this.name;

    if (!data['mobile']) {
      return this.native.showToast("用户名不能为空~");
    }
    // 密码登录
    if (this.login_type === 'userName') {
      data['password'] = this.password;
      if (!data['password']) {
        return this.native.showToast("密码不能为空~");
      }
    } else {
      // 验证码登录
      data['code'] = this.code;
      if (!data['code']) {
        return this.native.showToast("验证码不能为空~");
      }
    }

    data['device_id'] = this.getMyUid() || 'b24c3f95b198268';


    this.http.post('/api/app/login', data).subscribe(res => {
     console.log("res", res);
     if (res.code == 200) {
       this.native.showToast(res.info);
       // 缓存token
       res.data.token && this.storage.set("token", res.data.token);
       // 缓存用户信息
       res.data.shopclerk && this.storage.set("userInfo", res.data.shopclerk);
       // 跳转到我的页面
       this.navCtrl.push(TabsPage);

     } else {
       // 显示提示框
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

  // 获取验证码
  getAuthCode () {
    // 如果正在倒计时，不允许再点击
   if (this.timer) {
    return;
   }

   let mobile = this.name;

   if (!mobile) {
     return this.native.showToast("请输入手机号");
   }

   this.http.post("/api/app/sendsms", {mobile: mobile}).subscribe(res => {
     this.native.showToast(res.info);
     if (res.code == 200) {
       // 获取成功，开始倒计时
       this.countdown(60);
     }
   });
  }

  // 倒计时60秒
  countdown (num) {
    num--;
    console.log(num);
    this.timer = setTimeout(() => {
      // 倒计时到 0 结束
      if (num > 0) {
        this.countdown(num);
        this.btnText = "重新发送(" + num + "s)";
      } else {
        // 结束之后，清空timer
        clearTimeout(this.timer);
        // 设置为 0，为了重新点可以重新倒计时
        this.timer = 0;
        this.btnText = "发送验证码"
      }

    },1000);
  }

}
