/**
 * Created by HIAPAD on 2018/7/27.
 */
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { HttpService } from '../../../providers/HttpService';
import { Observable } from 'rxjs/Rx';
// import  cityData    from '../../../assets/chinese-cities.json';

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
    public httpService: Http
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

}
