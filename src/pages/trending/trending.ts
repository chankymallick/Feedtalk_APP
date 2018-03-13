
declare var window: any;
declare var cordova: any;

import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { IonicPage, ModalController, NavController, NavParams, Platform } from 'ionic-angular';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
import { LinksViewerPage } from '../../pages/links-viewer/links-viewer'
import { UtilityProvider } from '../../providers/utility/utility';


@IonicPage()
@Component({
  selector: 'page-trending',
  templateUrl: 'trending.html',
})
export class TrendingPage {
  @ViewChild(Content) content: Content;
  AllLinks;
  platform;
  Types;
  LastActiveSegment = "";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platfrm: Platform,
    public restApi: RestapiServiceProvider,
    public modalCtrl: ModalController,
    public utlityProvider: UtilityProvider
  ) {

    this.Types = "TOPSTORY";
    this.LastActiveSegment = this.Types
    this.loadFeedLinks(this.Types);
    this.platform = platfrm;
  }
  public segmentChanged(eventObj: any) {
    this.loadFeedLinks(eventObj.value);

    document.getElementById(this.LastActiveSegment).style.color = "#488AFF"
    document.getElementById(eventObj.value).style.color = "white"
    this.LastActiveSegment = eventObj.value;
    this.content.scrollToTop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrendingPage');
  }
  public loadFeedLinks(linkTypes: string) {
    this.restApi.getLatestFeeds("feedlinks/" + linkTypes).then(data => {
      this.AllLinks = data;
    });
  }
  openModal(FeedLink: any) {
    let modal = this.modalCtrl.create(LinksViewerPage, { "feedLinks": FeedLink });
    modal.present();
  }
  public getTimeInterval(publishedTime: number) {
    return this.utlityProvider.getTimeInterval(publishedTime);
  }

 public doRefresh(refresher) {
    this.loadFeedLinks(this.LastActiveSegment);
    setTimeout(() => {    
      refresher.complete();
    }, 2000);
  }

}
