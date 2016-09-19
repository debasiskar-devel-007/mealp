import {Component} from '@angular/core';
import {Page, Platform} from 'ionic-angular';
import {SignUpPage} from '../signup/signup'
import {Facebook} from 'ionic-native'


@Component({
  templateUrl: 'build/pages/hello-ionic/hello-ionic.html',
  //providers:[FbProvider],
})
export class HelloIonicPage {
  signupPage=SignUpPage;
  private  platform;

  constructor(platform:Platform) {
    this.platform = platform;

  }

  login() {
    alert(90);

    this.platform.ready().then(() => {
      Facebook.login(["email"]).then((result) => {
        console.log(result)
        alert(result)
      })
    });
  }



}
