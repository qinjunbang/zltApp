import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { DetailsPage } from './details/details';

@Component({
    selector: 'forward-page',
    templateUrl: 'forward.html'
})

export class WalletPage {
    constructor(
        public navCtrl: NavController
    ) {

    }
    forward() {
        
    }
    details() {
        //this.navCtrl.push(DetailsPage)
    }
}