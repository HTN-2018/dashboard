import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../home/home';
/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  uid: string;
  email: string;
  fb_user: Observable<any>;

  constructor(public app: App, private fbAuth: AngularFireAuth, private db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.uid = fbAuth.auth.currentUser.uid;
    this.email = fbAuth.auth.currentUser.email;
    this.fb_user = db.object('users/' + this.uid).valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  logout(){
    this.app.getRootNav().setRoot(HomePage);
    this.fbAuth.auth.signOut();
  }

}
