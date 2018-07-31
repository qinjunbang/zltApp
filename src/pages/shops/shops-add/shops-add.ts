/**
 * Created by HIAPAD on 2018/7/27.
 */
import { Component } from '@angular/core';
import { HttpService } from '../../../providers/HttpService';

@Component({
  selector: 'page-shops-add',
  templateUrl: 'shops-add.html'
})
export class ShopsAddPage {


  constructor(
    public http: HttpService
  ) {

  }
  ionViewDidLoad() {

  }

}
