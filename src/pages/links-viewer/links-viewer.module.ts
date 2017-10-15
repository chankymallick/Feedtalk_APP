import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LinksViewerPage } from './links-viewer';

@NgModule({
  declarations: [
    LinksViewerPage,
  ],
  imports: [
    IonicPageModule.forChild(LinksViewerPage),
  ],
})
export class LinksViewerPageModule {}
