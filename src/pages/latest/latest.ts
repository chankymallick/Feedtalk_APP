
import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { ArticleviewerPage } from '../articleviewer/articleviewer'
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
import { ModalController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-latest',
  templateUrl: 'latest.html',
})
export class LatestPage {
  @ViewChild(Content) content: Content;
  Types = "mostrecent";
  LatestFeed:any;
  public LastActiveSegment ="";

  public getDecodedTrimmedText(encodedText:string){
    
    return decodeURI(encodedText);   
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public restApi: RestapiServiceProvider
  ) {       
    this.LastActiveSegment = this.Types;
    restApi.getLatestFeeds("feed/"+this.LastActiveSegment).then(data => {     
      this.LatestFeed =data;      
    });   
  }

  public segmentChanged(eventObj: any) {
    this.content.scrollToTop();    
    document.getElementById(this.LastActiveSegment).style.color="#488AFF" 
    document.getElementById(eventObj.value).style.color="white" 
    this.LastActiveSegment =eventObj.value;    
    this.loadFeeds(eventObj.value);
  }
  public loadFeeds(type: string) {
    this.restApi.getLatestFeeds("feed/" + type).then(data => {
      this.LatestFeed = data;
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LatestPage');   
  }
  openModal(Feed:any) {
    let modal = this.modalCtrl.create(ArticleviewerPage, {"feed":Feed});
    modal.present();
  }
  public converDate(date:number){
    var customDate = new Date(date);

  }
  public doRefresh(refresher) {
   this.loadFeeds(this.LastActiveSegment);
    setTimeout(() => {    
      refresher.complete();
    }, 2000);
  }

}


