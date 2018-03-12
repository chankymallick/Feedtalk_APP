import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilityProvider } from '../../providers/utility/utility';
import { AlertController } from 'ionic-angular';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';

/**
 * Generated class for the CommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {

  public getCommentBody(text: string) {
    var body = {
      "commentText": text,
      "userName": this.getUserDetails("email"),
      "hiden": false,
      "displayName": this.getUserDetails("displayname"),
      "photoURL": this.getUserDetails("photoURL")
    }
    return body;
  }
  public getReplyBody(text: string) {
    var body = {
      "replyText": text,
      "userName": this.getUserDetails("email"),
      "displayName": this.getUserDetails("displayname"),
      "photoURL": this.getUserDetails("photoURL")
    }
    return body;
  }
  public Comments;
  public FeedId;
  public CommentLikeValue;
  public CommentDislikeValue;
  public Email;
  public loggedInStatus;
  public LikedDislikedComments=[];
  public LikedDislikedReplies=[];

  constructor(
    public restAPI: RestapiServiceProvider,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public utlityProvider: UtilityProvider
  ) {
    this.Comments = navParams.get('feed').comments;
    this.FeedId = navParams.get('feed').feedId;
    this.CommentDislikeValue = null;
    this.CommentLikeValue = null;
    this.loggedInStatus = localStorage.getItem("isLoggedIn");
    

  }
  public getUserDetails(type: string) {
    if (this.loggedInStatus != null || this.loggedInStatus != undefined || this.loggedInStatus != "") {
      var User = JSON.parse(localStorage.getItem("UserDetails"));
      if (type == "email") {
        return User.email;
      }
      if (type == "photoURL") {
        return User.photoURL;
      }
      if (type == "displayname") {
        return User.displayName;
      }
    }

  }
  ionViewDidLoad() {
  }
  public getTimeInterval(publishedTime: number) {
    return this.utlityProvider.getTimeInterval(publishedTime);
  }
  public refreshCommentData() {
    this.restAPI.getRequest("feed/comments/" + this.FeedId + "/", "Comment Loaded").then(data => {
      this.Comments = data;
    });
  }
  public likeComment(CommentID: number) {
    if (localStorage.getItem("isLoggedIn") != null) {
      this.restAPI.putRequest("feed/comments/like/" + this.FeedId + "/" + CommentID + "/", {}, "Comment Liked").then(data => {
        document.getElementById("LikeButton_" + CommentID).innerHTML = '<span class="button-inner"><ion-icon name="thumbs-up" role="img" class="icon icon-md ion-md-thumbs-up" aria-label="thumbs up" ng-reflect-name="thumbs-up"></ion-icon>' + data + '</span><div class="button-effect"></div>';
      });
    }
  }
  public dislikeComment(CommentID: number) {
    if (localStorage.getItem("isLoggedIn") != null) {
      //this.CommentDislikeValue = this.restAPI.putRequest("feed/comments/dislike/" + this.FeedId + "/" + CommentID + "/", {}, "Comment Disliked");
      this.restAPI.putRequest("feed/comments/dislike/" + this.FeedId + "/" + CommentID + "/", {}, "Comment Disliked").then(data => {
        document.getElementById("DislikeButton_" + CommentID).innerHTML = '<span class="button-inner"><ion-icon name="thumbs-down" role="img" class="icon icon-md ion-md-thumbs-down" aria-label="thumbs down" ng-reflect-name="thumbs-down"></ion-icon>' + data + '</span><div class="button-effect"></div>';
      });
    }
  }
  public isCommentLikedDisliked(userEmail:string) {
   
  }
  public isReplyLikedDisliked(userEmail:string) {
    
  }
  public setCommentLikedDisliked(userEmail:string) {
    
  }
  public setReplyLikedDisliked(userEmail:string) {
    
  }
  public likeReply() {

  }
  public dislikeReply() {

  }
  public reportComment() {

  }
  public newComment() {
    if (localStorage.getItem("isLoggedIn") != null) {
      let prompt = this.alertCtrl.create({
        title: 'Post as - ' + this.getUserDetails("displayname"),
        message: "500 Character",
        inputs: [
          {
            name: 'Comment',
            placeholder: 'Comment'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {

            }
          },
          {
            text: 'Post',
            handler: data => {
              this.restAPI.postNewComment(this.getCommentBody(data.Comment), this.FeedId).then(data => {
                this.refreshCommentData();
              });

            }
          }
        ]
      });
      prompt.present();
    }
    else {
      this.utlityProvider.presentToast("Log in to post new Comment !")
    }
  }
  public newReply(CommentId: number, replyto: string) {
    if (localStorage.getItem("isLoggedIn") != null) {
      let prompt = this.alertCtrl.create({
        title: 'Reply To - ' + this.getUserDetails("displayname"),
        message: "500 Character Left",
        inputs: [
          {
            name: 'Reply',
            placeholder: 'Reply'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {

            }
          },
          {
            text: 'Post',
            handler: data => {
              this.restAPI.postNewReply(this.getReplyBody(data.Reply), this.FeedId, CommentId).then(data => {
                this.refreshCommentData();
              });

            }
          }
        ]
      });
      prompt.present();
    }
    else {
      this.utlityProvider.presentToast("Log in to post new reply !")
    }
  }
}
