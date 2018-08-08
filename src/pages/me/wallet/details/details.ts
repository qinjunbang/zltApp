import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'details-page',
    templateUrl: 'details.html'
})

export class DetailsPage {
    constructor(
        public navCtrl: NavController
    ) {

    }
    forward() {
        //this.navCtrl.push()
    }
}