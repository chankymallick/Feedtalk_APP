
declare var window: any;
declare var cordova: any;

import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-trending',
  templateUrl: 'trending.html',
})
export class TrendingPage {
  @ViewChild(Content) content: Content;
  Types = "All";
  platform;
  constructor(public navCtrl: NavController, public navParams: NavParams, private platfrm: Platform) {
    this.platform = platfrm;
  }
  public segmentChanged(eventObj: any) {
    this.content.scrollToTop();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TrendingPage');
  }

  public openExternalLink() {
    this.platform.ready().then(() => {
      if (cordova && cordova.InAppBrowser) {
        window.open = cordova.InAppBrowser.open;
        window.open("https://www.google.co.in", '_system');
      }
    });
  }

}
