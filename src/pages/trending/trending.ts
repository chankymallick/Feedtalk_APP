
declare var window: any;
declare var cordova: any;

import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { IonicPage,ModalController, NavController, NavParams, Platform } from 'ionic-angular';
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
  Types = "All";
  AllLinks;
  platform;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private platfrm: Platform, 
    public restApi: RestapiServiceProvider,
    public modalCtrl: ModalController,
    public utlityProvider : UtilityProvider
   ) {
    this.platform = platfrm;
  }
  public segmentChanged(eventObj: any) {
    this.content.scrollToTop();
  }
  ionViewDidLoad() {
  
    this.restApi.getLatestFeeds("https://192.168.43.148:8443/feedlinks/latest").then(data => {     
      this.AllLinks =data;    
    });   
    console.log('ionViewDidLoad TrendingPage');
  }
  public loadFeedLinks(){

  }  
  openModal(FeedLink:any) {
    let modal = this.modalCtrl.create(LinksViewerPage, {"feedLinks":FeedLink});
    modal.present();
  }
  public getTimeInterval(publishedTime:number){    
      return this.utlityProvider.getTimeInterval(publishedTime);   
  }

}
