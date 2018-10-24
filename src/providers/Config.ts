/**
 * Created by HIAPAD on 2018/7/26.
 */
export class Config {

  // public static app_serve_url = 'https://www.zltgs.com'; // 打包
  public static app_serve_url = 'http://localhost:8100/';  // web浏览器调试
  // public static app_serve_url = 'http://192.168.0.127:8100/'; // 真机调试
  public static app_upload_serve_url = 'https://www.zltgs.com/'; // 上传图片服务器
  public static token = ''; // token
  public static userInfo = []; // user info
  public static device_id = ''; // 设备id
  public static apkDownloadUrl = 'https://www.zltgs.com/downloads/android/20180824/zhanglitong.apk'; // apk下载路径
  public static ipaDownLoadUrl = 'https://itunes.apple.com/cn/app/%E6%8E%8C%E9%87%8C%E9%80%9A%E5%95%86%E5%AE%B6%E5%90%8E%E5%8F%B0/id1438491682?mt=8'; // ios下载页面

  // 内置浏览器样式
  public static  options = {
        statusbar: {
          color: '#ffffffff'
        },
        toolbar: {
          height: 44,
          color: '#f0f0f0ff'
        },
        title: {
          color: '#003264ff',
          showPageTitle: true
        },
        backButton: {
          image: 'back',
          imagePressed: 'back_pressed',
          align: 'left',
          event: 'backPressed',
        },
        forwardButton: {
          image: 'forward',
          imagePressed: 'forward_pressed',
          align: 'left',
          event: 'forwardPressed'
        },
        closeButton: {
          image: 'close',
          imagePressed: 'close_pressed',
          align: 'left',
          event: 'closePressed'
        },
        customButtons: [
          {
            image: 'share',
            imagePressed: 'share_pressed',
            align: 'right',
            event: 'sharePressed'
          }
        ],
        menu: {
          image: 'menu',
          imagePressed: 'menu_pressed',
          title: 'Test',
          cancel: 'Cancel',
          align: 'right',
          items: [
            {
              event: 'helloPressed',
              label: 'Hello World!'
            },
            {
              event: 'testPressed',
              label: 'Test!'
            }
          ]
        },
        backButtonCanClose: true
      };

}
