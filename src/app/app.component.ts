import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LatestPage } from '../pages/latest/latest';
import { TrendingPage } from '../pages/trending/trending';
import { OthersPage } from '../pages/others/others';

import { LoadingController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireModule } from 'angularfire2';
import firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook'


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  progressObject;
  isLoggedIn = false;
  userLoggedInImageUrl = null;
  userLoggedInEmail = null;
  userLoggedInName = null;
  rootPage: any = HomePage;
  currentUser;
  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public googlePlus: GooglePlus,
    public facebook: Facebook,
    public progress: LoadingController

  ) {
    this.startProgress("Checking sign in status ...");
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.setLoggedInStatus();
        this.stopProgress();
      }
      else {
        this.setLogOutInStatus();
        this.stopProgress();
      }
    });
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage }
    ];

  }

  public initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }
  public setLoggedInStatus() {

    this.isLoggedIn = true;
    this.userLoggedInEmail = this.currentUser.email;
    this.userLoggedInImageUrl = this.currentUser.photoURL;
    this.userLoggedInName = this.currentUser.displayName;

  }
  public setLogOutInStatus() {
    this.currentUser = null;
    this.isLoggedIn = false;
    this.userLoggedInEmail = null;
    this.userLoggedInImageUrl = null;
    this.userLoggedInName = null;
  }
  public openPage(page) {
    this.nav.setRoot(page.component);
  }
  public login(): any {
    this.googlePlus.login({
      'webClientId': '717530962060-gu5j1c0asmatcg2h803cun1t54o7ld85.apps.googleusercontent.com',
      'offline': true
    }).then(res => {
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken)).then(user => {
     
      }).catch(ns => {
        alert("Login Unsuccesfull");
      })
    })

  }
  public newGoogleLogin() {
    this.startProgress("Logging in , please wait ...");
    this.login();
    
  }
  public logout() {
    this.startProgress("Logging out , please wait ...");
    firebase.auth().signOut();
    this.setLogOutInStatus();
   
  }

  public facebookLogin(): Promise<any> {
    return this.facebook.login(['email'])
      .then(response => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);

        firebase.auth().signInWithCredential(facebookCredential)
          .then(success => {
          });

      }).catch((error) => { alert(JSON.stringify(error)) });
  }
  public startProgress(val) {
    this.progressObject = this.progress.create({
      content: val,
      duration: 5000,
      dismissOnPageChange: true
    });
    this.progressObject.present();
  }
  public stopProgress() {
    this.progressObject.dismiss();
  }

}
