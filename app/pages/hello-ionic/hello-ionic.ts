import {Component} from '@angular/core';
import {Page, Platform} from 'ionic-angular';
import {SignUpPage} from '../signup/signup'
import {FoodsPage} from '../foods/foods'
import {Facebook} from 'ionic-native'
import {isArray} from "rxjs/util/isArray";
import { Device } from 'ionic-native';
import '../../../node_modules/chart.js/src/chart.js';
import { BaseChartComponent } from 'ng2-charts/ng2-charts';
import { Geolocation } from 'ionic-native';



@Component({
  templateUrl: 'build/pages/hello-ionic/hello-ionic.html',
  //providers:[FbProvider],
  directives:[BaseChartComponent],
  styles: [`
    .chart {
      display: block;
      height:500px;
    }
  `],

})
export class HelloIonicPage {
  signupPage=SignUpPage;
  foodPage=FoodsPage;
  private  platform;
  location:any;
  locationar:Array<any>;


  public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData:number[] = [300, 500, 100];
  public pieChartType:string = 'pie';

  constructor(platform:Platform) {
    this.platform = platform;

  }

  login() {
    alert(90);

    this.platform.ready().then(() => {

      Facebook.login(["email","public_profile"]).then((result) => {
        console.log(result);
        alert(result);

        Facebook.api('/' + result.authResponse.userID + '?fields=id,name,gender,email,first_name,last_name',[]).then((result1) => {
          console.log(result1);
          alert(result1);
          var x;
          for (x in result1){
            alert(x+'---'+result1[x]);
            if(isArray(result1[x])){
              let y;
              for(y in result1[x]){
                alert(y+''+result1[x][y]);
              }
            }
          }


        });



      });



      /*Facebook.api('/me','').then((result) => {
        console.log(result);
        alert(result);
        var x;
        for (x in result['authResponse']){
          alert(x+'---'+result['authResponse'][x]);
          if(isArray(result['authResponse'][x])){
            let y;
            for(y in result[x]){
              alert(y+''+result[x][y]);
            }
          }
        }
      });*/


    });
  }
  deviceinfo(){

    alert(Device.device);
    let x;
    for (x in Device.device){
      alert(x+'--'+Device.device[x]);
    }
  }
  getlocation(){
    Geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      alert('latitude'+resp.coords.latitude);
      alert('longitude'+resp.coords.longitude);
      // resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  watchlocation() {
    this.location = Geolocation.watchPosition({maximumAge: 3000, timeout: 5000, enableHighAccuracy: true});
    this.location.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
      alert('latitude'+data.coords.latitude);
      alert('longitude'+data.coords.longitude);
      //this.locationar.push('latitude' + data.coords.latitude + 'longitude' + data.coords.longitude);
    });
  }


  unsubscribe(){
    this.location.unsubscribe();
  }


}


