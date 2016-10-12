import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import {Http, Headers} from "@angular/http";
import {ControlGroup, Control} from "@angular/common";


@Component({
  templateUrl: 'build/pages/signup/signup.html',
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class SignUpPage {
  public verifyemail=true;
  private loginForm:FormGroup;
  private nav:NavController;
  private dob:any;
  private unittext:any;

  constructor(fb: FormBuilder,public navCtrl: NavController,private _http: Http) {
    this.unittext={
        title: 'Weight Units',
        subTitle: 'Select your Weight Units'
  };
    this.loginForm = fb.group({
      fullname: ["12", Validators.required],
      email: ["", SignUpPage.validateEmail],
      password: ["", Validators.required],
      heightft: ["", Validators.required],
      heightinch: ["0", Validators.required],
      weight: ["", Validators.required],
      weightunit: ["lb", Validators.required],
      dob: ["2009-01-01", Validators.required],
      confpassword: ["", Validators.required]
    }, {validator: this.matchingPasswords('password', 'confpassword')});
  }

  doSubmit(event){
    let x:any;
    console.log(this.loginForm.value.dob);

    for(x in this.loginForm.controls){
      this.loginForm.controls[x].markAsTouched();

    }

    if(this.loginForm.valid){
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      var link = 'http://184.168.146.185:1001/user-signup';
      var data = {fullname: event.fullname,email: event.email,password: event.password, deviceid: ''};

      this._http.post(link, data)
          .subscribe(data => {
            console.log(data);
          }, error => {
            console.log("Oooops!");
          });

    }

  }

    updatefname(){
    //$('.dob')
        alert(92);
        console.log(this.loginForm.value.fullname);
        console.log(this.loginForm.controls['fullname']);
        this.loginForm.value.fullname='uu7';
        //this.loginForm.controls['fullname'].updateValue("uu7");
      (<FormControl>this.loginForm.controls['fullname']).updateValue('uu7');

        console.log(this.loginForm.value.fullname);
  }



  public matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
  return (group: ControlGroup): {[key: string]: any} => {
    let password = group.controls[passwordKey];
    let confirmPassword = group.controls[confirmPasswordKey];

    if (password.value !== confirmPassword.value) {
      console.log('mismatch');
      return {
        mismatchedPasswords: true
      };
    }
  }
}
  static validateConfirmPassword(control: ControlGroup){

    console.log('34324324');
    console.log(control.controls);
    //console.log(control.controls['password']);
    //console.log(control.controls['confpassword']);
    //console.log(this.loginForm.value.password);
   /* if (control.value=='' || control.value!= ) {

      return { 'invalidEmailAddress': true };
    }
   */ //let appsignupobj=new AppSignup();
    // /console.log(appsignupobj.signupform.value.term);

  }
  static validateEmail(control: FormControl){

    console.log('34324324');
    console.log(control.value);
    if (control.value=='' || !control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {

      return { 'invalidEmailAddress': true };
    }
    //let appsignupobj=new AppSignup();
    // /console.log(appsignupobj.signupform.value.term);

  }
}
