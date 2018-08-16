import { Component } from '@angular/core';
import { HttpService } from '../../../../providers/HttpService';
import { NavController , AlertController , ActionSheetController , NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NativeService } from '../../../../providers/NativeService';



@Component({
  selector: 'dishes-class',
  templateUrl: 'dishesClass.html'
})
export class dishesClassPage {
  public testRadioOpen: false;
  public shopId = '';
  public dishesList = '';
  constructor(
    public http: HttpService,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public params: NavParams,
    public storage: Storage,
    public native: NativeService
  ) {
    this.shopId = this.params.get('shopId');
    this.getDishesClass()
  }

  //获取本地设备id和token
  public getToken(){
    return new Promise((resolve) => {
      this.storage.get('token').then((val) => {
          resolve(val)
      });
    })
  }
  public getDeviceId(){
    return new Promise((resolve) => {
      this.storage.get('device_id').then((val) => {
          resolve(val)
      });
    })
  }

  getDishesClass() {
    let that = this
    async function getDishesClass(){
      let token = await that.getToken();
      let deviceId = await that.getDeviceId();
      that.http.post("/api/app/menuAll", {'token':token,'device_id': deviceId,'shop_id':that.shopId}).subscribe(res => {
          console.log("res", res);
          if(res.code == 200){
            that.dishesList = res.data
          }else {
            that.native.alert('提示','',res.info)
          }
      })
    }
    getDishesClass()
  }


  edit(id){
    let that = this;
    let alert = this.alertCtrl.create({
      title: '修改分类',
      inputs: [
        {
          name: 'name',
          placeholder: '分类名称'
        },
        {
          name: 'sort',
          placeholder: '排序'
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: (data) => {
            async function editDishesClass(){
              let token = await that.getToken();
              let deviceId = await that.getDeviceId();
              that.http.post("/api/app/menuEdit", {'token':token,'device_id': deviceId,'shop_id':that.shopId,'menu_name':data.name,'id':id}).subscribe(res => {
                  console.log("res", res);
                  if(res.code == 200){
                    that.getDishesClass();
                    that.native.alert('提示','',res.info);
                  }else {
                    that.native.alert('提示','',res.info)
                  }
              })
            }
            editDishesClass()
          }
        }
      ]
    });
    alert.present();
  }

  add(){
    let that = this;
    console.log(that.shopId)
    let alert = this.alertCtrl.create({
      title: '添加分类',
      inputs: [
        {
          name: 'name',
          placeholder: '分类名称'
        },
        {
          name: 'sort',
          placeholder: '排序'
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: (data) => {
            async function addDishesClass(){
              let token = await that.getToken();
              let deviceId = await that.getDeviceId();
              that.http.post("/api/app/menuAdd", {'token':token,'device_id': deviceId,'shop_id':that.shopId,'menu_name':data.name,'menu_sort':data.sort}).subscribe(res => {
                  console.log("res", res);
                  if(res.code == 200){
                    that.getDishesClass();
                    that.native.alert('提示','',res.info);
                  }else {
                    that.native.alert('提示','',res.info)
                  }
              })
            }
            addDishesClass()
          }
        }
      ]
    });
    alert.present();
  }

  delete(id){
    let that = this;
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
          {
            text: "确定删除",
            handler: () => {
              async function addDishesClass(){
                let token = await that.getToken();
                let deviceId = await that.getDeviceId();
                that.http.post("/api/app/menuDel", {'token':token,'device_id': deviceId,'shop_id':that.shopId,'id':id}).subscribe(res => {
                    console.log("res", res);
                    if(res.code == 200){
                      that.getDishesClass();
                      that.native.alert('提示','',res.info);
                    }else {
                      that.native.alert('提示','',res.info)
                    }
                })
              }
              addDishesClass()
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