/**
 * Created by HIAPAD on 2018/7/27.
 */
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { HttpService } from '../../../../providers/HttpService';
import { Observable } from 'rxjs';


@Component({
  selector: 'page-employees-add',
  templateUrl: 'employees-add.html'
})
export class EmployeesAddPage {

  constructor(
    public http: HttpService,
    public httpService: Http
  ) {

  }
  // 页面初始化完成
  ionViewDidLoad() {

  }


}
