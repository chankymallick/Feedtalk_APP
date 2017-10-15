import { Component,ViewChild } from '@angular/core';
import { NavController,Content } from 'ionic-angular';

import { LatestPage} from '../latest/latest';
import { TrendingPage} from '../trending/trending';
import { OthersPage} from '../others/others';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;
 
  latestPage = LatestPage;
  trendingPage = TrendingPage;
  othersPage = OthersPage;

  public segmentChanged(eventObj:any){
    this.content.scrollToTop();
  }
  constructor(public navCtrl: NavController) {

  }

}
