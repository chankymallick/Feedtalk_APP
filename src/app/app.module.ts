import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ArticleviewerPage } from '../pages/articleviewer/articleviewer'
import { LinksViewerPage } from '../pages/links-viewer/links-viewer'
import { LatestPage } from '../pages/latest/latest';
import { TrendingPage } from '../pages/trending/trending';
import { OthersPage } from '../pages/others/others';
import { CommentsPage} from '../pages/comments/comments'

import { Facebook } from '@ionic-native/facebook'
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireModule } from 'angularfire2';
import firebase from 'firebase';

import { AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestapiServiceProvider } from '../providers/restapi-service/restapi-service';
import { HttpModule } from '@angular/http';
import { UtilityProvider } from '../providers/utility/utility';
import { ToastController } from 'ionic-angular';
import { EscapeHtmlPipe } from '../pipes/keep-html.pipe';

export const firebaseConfig = {

  apiKey: "AIzaSyAM7NSBgxZsPYXDoROUdHMhjmT4_Dcyl8E",
  authDomain: "feedtalk-sep2017.firebaseapp.com",
  databaseURL: "https://feedtalk-sep2017.firebaseio.com",
  projectId: "feedtalk-sep2017",
  storageBucket: "feedtalk-sep2017.appspot.com",
  messagingSenderId: "717530962060"
}
firebase.initializeApp(firebaseConfig);
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TrendingPage,
    LatestPage,
    OthersPage,
    ArticleviewerPage,
    LinksViewerPage,
    CommentsPage,
    EscapeHtmlPipe

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TrendingPage,
    LatestPage,
    OthersPage,
    ArticleviewerPage,
    LinksViewerPage,
    CommentsPage
  ],
  providers: [
    StatusBar,
    SplashScreen, GooglePlus,Facebook,AlertController,ToastController,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RestapiServiceProvider,
    UtilityProvider
  ]
})
export class AppModule { }
