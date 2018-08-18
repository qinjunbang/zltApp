/**
 * Created by HIAPAD on 2018/8/11.
 */
import { Injectable } from '@angular/core';

declare var xunfeiListenSpeaking: any;

@Injectable()

export class SpeakingService {
  constructor () {

  }

  /*
  *
  * 播放语音
  * @param str 需要播放的文字
  *
  * */

  startSpeak(str: string = '', loop: number = 0) {
    console.log("xunfeiListenSpeaking", xunfeiListenSpeaking);
    xunfeiListenSpeaking.startSpeak(success => {
      console.log("success");
      if (loop == 1) {
        this.startSpeak(str, loop);
      }
    }, err => {
      console.log("err");
    }, str);


  }

  /*
  *
  * 停止播放,本次播放结束
  *
  * */
  stopSpeak () {
    xunfeiListenSpeaking.stopSpeak();
  }

  /*
  *
  * 暂停播放
  *
  * */
  pauseSpeaking () {
    xunfeiListenSpeaking.pauseSpeaking();
  }

  /*
   *
   * 恢复播放
   *
   * */
  resumeSpeaking () {
    xunfeiListenSpeaking.resumeSpeaking();
  }
}
