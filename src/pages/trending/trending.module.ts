import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrendingPage } from './trending';

@NgModule({
  declarations: [
    TrendingPage,
  ],
  imports: [
    IonicPageModule.forChild(TrendingPage),
  ],
})
export class TrendingPageModule {}
