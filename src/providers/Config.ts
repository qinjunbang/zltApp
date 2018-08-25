/**
 * Created by HIAPAD on 2018/7/26.
 */
export class Config {

  // public static app_serve_url = 'https://r.zhanglitong.com'; // 打包
  // public static app_serve_url = 'http://localhost:8100/';  // web浏览器调试
  public static app_serve_url = 'http://192.168.0.144:8100/'; // 真机调试
  public static app_upload_serve_url = 'https://r.zhanglitong.com/'; // 上传图片服务器
  public static token = ''; // token
  public static userInfo = []; // user info
  public static device_id = ''; // 设备id
  public static apkDownloadUrl = 'https://r.zhanglitong.com/downloads/android/20180824/zhanglitong.apk'; // apk下载路径
  public static ipaDownLoadUrl = 'https://r.zhanglitong.com/mobile/index'; // ios下载页面

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
