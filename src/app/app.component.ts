import { Component, ViewChild } from '@angular/core';
import { Platform, Events, IonicApp, Keyboard, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeService } from '../providers/NativeService';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/me/login/login';
import { MePage } from '../pages/me/me';
import { PrivacyPage } from '../pages/me/privacy/privacy';
import { DetailsPage } from '../pages/me/wallet/details/details';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('myNav') nav: Nav;

  //rootPage:any = LoginPage;
  //rootPage:any = DetailsPage;
  rootPage:any = MePage;

  private backButtonPressed: boolean = false; // 是否连续两次按返回按钮

  constructor(
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private platform: Platform,
    private events: Events,
    private keyboard: Keyboard,
    private ionicApp: IonicApp,
    private native: NativeService
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // 设置状态栏颜色
      statusBar.styleDefault();
      // 隐藏启动页面
      splashScreen.hide();

      // 检查网络
       this.assertNetwork();
      // 检查版本更新

      // 初初始化极光推送事件

      // 注册android返回按钮事件
      this.registerBackButtonAction();

    });
  }


  // 检查网络
  assertNetwork () {
    if (!this.native.isConnecting()) {
      this.native.alert("未检查到网络连接");
    }
  }
  // 处理android按钮返回事件
  registerBackButtonAction () {
    // 如果不是安卓手机，return
    if (!this.native.isAndroid()) {
      return;
    }

    this.platform.registerBackButtonAction(() => {
      console.log('点击到了');
      this.events.publish('android:backButtonAction');

      // 如果键盘是打开的，先关闭键盘
      if (this.keyboard.isOpen()) {
        this.keyboard.close();
        return;
      }

      // 如果页面有 loading, toast, alert,先关闭
      const activePortal = this.ionicApp._modalPortal.getActive() || this.ionicApp._toastPortal.getActive() || this.ionicApp._overlayPortal.getActive();

      if (activePortal) {
        activePortal.dismiss();
        return;
      }

      // 如果不是首页，就返回上一页，如果是首页，显示关闭 App 提示框
      return this.nav.canGoBack() ? this.nav.pop() : this.showExit();
    });
  }

  // 显示关闭 App 提示框
  showExit () {
    console.log("6666");
    if (this.backButtonPressed) {
      // 退出 App
      this.platform.exitApp();
    } else {
      // 提示用户是否要关闭 app
      this.native.showToast("再按一次退出APP");
      this.backButtonPressed = true;

      // 两秒内没有再按第二次，则将状态变为 false
      setTimeout( () => {
        this.backButtonPressed = false;
      }, 2000)
    }
  }
}
