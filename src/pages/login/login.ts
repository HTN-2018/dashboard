import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { TabsPage } from '../tabs/tabs';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild('email') email;
  @ViewChild('password') password;

  constructor(private alertCtrl: AlertController, private fbAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  alert(message: string){
    this.alertCtrl.create({
      title: 'Info',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  loginUser(){
    this.fbAuth.auth.signInWithEmailAndPassword(this.email.value, this.password.value).then(data => {
      console.log('logged in', this.fbAuth.auth.currentUser);
      this.navCtrl.setRoot(TabsPage);
    }).catch(error => {
      console.log('error', error);
      this.alert(error.message);
    })
  }

}
