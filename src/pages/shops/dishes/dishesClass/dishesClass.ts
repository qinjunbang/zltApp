import { Component } from '@angular/core';
import { HttpService } from '../../../../providers/HttpService';
import { NavController , AlertController , ActionSheetController } from 'ionic-angular';




@Component({
  selector: 'dishes-class',
  templateUrl: 'dishesClass.html'
})
export class dishesClassPage {
  public testRadioOpen: false
  constructor(
    public http: HttpService,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController
  ) {}

  edit(){
    let alert = this.alertCtrl.create({
      title: '修改分类',
      inputs: [
        {
          name: 'title',
          placeholder: '分类名称'
        },
        {
          name: 'title',
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
          handler: () => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    alert.present();
  }

  add(){
    let alert = this.alertCtrl.create({
      title: '添加分类',
      inputs: [
        {
          name: 'title',
          placeholder: '分类名称'
        },
        {
          name: 'title',
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
          handler: () => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    alert.present();
  }

  delete(){
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
          {
            text: "确定删除",
            handler: () => {
                
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