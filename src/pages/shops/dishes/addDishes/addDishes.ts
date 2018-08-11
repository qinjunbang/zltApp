import { Component } from '@angular/core';
import { HttpService } from '../../../../providers/HttpService';
import { NavController , AlertController , ActionSheetController} from 'ionic-angular';
import { NativeService } from '../../../../providers/NativeService';


@Component({
  selector: 'add-dishes',
  templateUrl: 'addDishes.html'
})
export class addDishesPage {
    public testRadioOpen = false;
    constructor(
        public http: HttpService,
        public navCtrl: NavController,
        public alertCtrl: AlertController,
        public native: NativeService,
        public actionSheetCtrl: ActionSheetController,
    ){

    }

    selectList() {
        let alert = this.alertCtrl.create();
        alert.setTitle('请选择菜品分类');

        alert.addInput({
            type: 'radio',
            label: '甜的',
            value: '甜的',
            checked: true
        });

        alert.addInput({
        type: 'radio',
        label: '烤的',
        value: '烤的'
        });

        alert.addButton('取消');
        alert.addButton({
        text: '确定',
        handler: (data: any) => {
            console.log('Radio data:', data);
            this.testRadioOpen = false;
        }
        });
        alert.present();
    }

    selectClass() {
        let alert = this.alertCtrl.create();
        alert.setTitle('请选择分类');

        alert.addInput({
            type: 'radio',
            label: '推荐',
            value: '推荐',
            checked: true
        });

        alert.addInput({
            type: 'radio',
            label: '热卖',
            value: '热卖'
        });
        alert.addInput({
            type: 'radio',
            label: '特价',
            value: '特价'
        });

        alert.addButton('取消');
        alert.addButton({
        text: '确定',
        handler: (data: any) => {
            console.log('Radio data:', data);
            this.testRadioOpen = false;
        }
        });
        alert.present();
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
    chooseImg () {
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