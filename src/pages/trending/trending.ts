
declare var window: any;
declare var cordova: any;

import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';

@IonicPage()
@Component({
  selector: 'page-trending',
  templateUrl: 'trending.html',
})
export class TrendingPage {
  @ViewChild(Content) content: Content;
  Types = "All";
  AllLinks;
  platform;
  constructor(public navCtrl: NavController, public navParams: NavParams, private platfrm: Platform, public restApi: RestapiServiceProvider) {
    this.platform = platfrm;
    restApi.getLatestFeeds("https://192.168.43.148:8443/feedlinks").then(data => {     
      this.AllLinks =data;    
    });   
  }
  public segmentChanged(eventObj: any) {
    this.content.scrollToTop();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TrendingPage');
  }
  public loadFeedLinks(){

  }
  public openExternalLink(link:any) {
    this.platform.ready().then(() => {
      window.open(link, '_system');     
    });
  }

}
