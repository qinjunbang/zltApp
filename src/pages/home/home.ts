import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativeService } from '../../providers/NativeService';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public native: NativeService

  ) {

  }


  // 检测真机
  checkMobile() {
    let fool = this.native.isMobile();

    this.native.alert("提示", String(fool));
  }

  // 检测是否为安卓
  isAndroid () {
    let fool = this.native.isAndroid();

    this.native.alert("提示", String(fool));
  }

  // 检测是否为iOS
  isIos () {
    let fool = this.native.isIos();

    this.native.alert("提示", String(fool));
  }

  showAlert() {
    this.native.alert("提示", "我是弹框！");
  }

  showToast() {
    this.native.showToast("我是提示框");
  }
}
