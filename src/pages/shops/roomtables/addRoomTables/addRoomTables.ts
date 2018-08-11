import { Component } from '@angular/core';
//import { HttpService } from '../../../../providers/HttpService';
import { NavController , ActionSheetController } from 'ionic-angular';
import { NativeService } from '../../../../providers/NativeService';


@Component({
  selector: 'add-room-tables',
  templateUrl: 'addRoomTables.html'
})

export class addRoomTablesPage{
    constructor(
        public navCtrl: NavController,
        public actionSheetCtrl: ActionSheetController,
        public native: NativeService
    ){
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