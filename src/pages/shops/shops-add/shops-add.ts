/**
 * Created by HIAPAD on 2018/7/27.
 */
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { ActionSheetController } from 'ionic-angular';
import { HttpService } from '../../../providers/HttpService';
import { NativeService } from '../../../providers/NativeService';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-shops-add',
  templateUrl: 'shops-add.html'
})
export class ShopsAddPage {

   public cities = []; // 城市JSON数据
   public startTime:string = '08:00';
   public endTime:string = '22:00';

  constructor(
    public http: HttpService,
    public httpService: Http,
    public native: NativeService,
    public actionSheetCtrl: ActionSheetController
  ) {

  }
  // 页面初始化完成
  ionViewDidLoad() {
    // 初始化省份城市区域
    this.getCitiesData().subscribe(data => {
      console.log("data", data.json());
      this.cities = data.json();

    });
  }

  // 获得省份城市区域数据
  getCitiesData() {
    return Observable.create(observer => {
      this.httpService.get('assets/chinese-cities.json').subscribe(data => {
        observer.next(data);
      });
    });
  }

  // 选择省份城市区域回调
  changeCitiesDate(event) {
    console.log("6666", event);
  }

  // 从图库获取图片
  getPictureByLibrary () {
    console.log("666");
    this.native.getPictureByLibrary().subscribe(res => {
      console.log("res", res);
    }, err => {
      console.log("err1", err);
    });
  }

  // 拍照获取图片
  getPictureByCamera () {
    this.native.getPictureByCamera().subscribe(res => {
      console.log("res", res);
    }, err => {
      console.log("err", err);
    });
  }

  // 点击上传图片
  getImage () {
    const actionSheet = this.actionSheetCtrl.create({
      title: "获取图片",
      buttons: [
        {
          text: "从相册中获取",
          handler: () => {
            this.getPictureByLibrary();
          }
        },
        {
          text: "拍照",
          handler: () => {
            this.getPictureByCamera();
          }
        },
        {
          text: '取消',
          role: 'cancel'
        }
      ]
    });

    actionSheet.present();
  }

}
