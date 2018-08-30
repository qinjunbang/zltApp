import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NativeService } from '../../../providers/NativeService';

declare var qq: any;
@Component({
    selector: 'address-page',
    templateUrl: 'address.html'
})

export class AddressPage {
  public map: any;
  public parent: any;
  public currentCity: string = '';
  public markers = [];
  public address: string = '';
  constructor (
    public native: NativeService,
    public navCtrl: NavController,
    public navParam: NavParams
  ) {
    this.parent = navParam.get("page");
    console.log("this.parent", this.parent);
  }

  ionViewDidEnter () {
    this.createMap();

  }


  // 创建一个地图
  createMap () {
    let _that = this;

    this.map =  new qq.maps.Map(document.getElementById("map"), {
      center:  new qq.maps.LatLng(39.916527,116.397128),
      zoom: 13
    });

    //实例化自动完成
    let input = new qq.maps.place.Autocomplete(document.getElementById('place'));


    //获取城市列表接口设置中心点
    let citylocation = new qq.maps.CityService({
      complete : function(result){
        console.log("city", result);
        _that.currentCity = result.detail.name;
        _that.map.setCenter(result.detail.latLng);
      }
    });

    //调用searchLocalCity();方法    根据用户IP查询城市信息。
    citylocation.searchLocalCity();

    //调用Poi检索类。用于进行本地检索、周边检索等服务。
    let searchService = new qq.maps.SearchService({
      // 获得信息回调
      complete: function (results) {
        //设置回调函数参数
        var pois = results.detail.pois;
        console.log("pois", pois);
        // 默认选择第一条地址
        _that.address = pois[0].address;

        var latlngBounds = new qq.maps.LatLngBounds();
        for (var i = 0, l = pois.length; i < l; i++) {
          var poi = pois[i];
          //扩展边界范围，用来包含搜索到的Poi点
          latlngBounds.extend(poi.latLng);

          (function(n) {
            var marker = new qq.maps.Marker({
              map: _that.map
            });
            marker.setPosition(pois[n].latLng);

            marker.setTitle(i + 1);

            _that.markers.push(marker);

            // 给 marker绑定点击事件
            qq.maps.event.addListener(marker, 'click', function() {
              // 点击标记，获取当前标记的地址
              _that.address = pois[n].address;
              // 把数据带回上个页面
              _that.checkSelect();
            });
          })(i);
        }

        //调整地图视野
        _that.map.fitBounds(latlngBounds);
      }
    });

    //添加监听事件
    qq.maps.event.addListener(input, "confirm", function(res) {
      // 每次重新标记之前，要清除原来的marker
      _that.clearMarkers(_that.markers);
      //根据输入的城市设置搜索范围, 为当前城市
      searchService.setLocation(_that.currentCity);
      // 开始搜索
      searchService.search(res.value);
    });
  }


  // 清除 marker 标记
  clearMarkers(overlays) {
    var overlay;
    while (overlay = overlays.pop()) {
      overlay.setMap(null);
    }
  }
  // 选择完成
  checkSelect () {
    if (!this.address) {
      return this.native.showToast("地址不能为空");
    }
    this.parent.address = this.address;
    this.navCtrl.pop();
  }
}
