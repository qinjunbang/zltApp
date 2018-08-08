import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from './details/details';

@Component({
    selector: 'wallet-page',
    templateUrl: 'wallet.html'
})

export class WalletPage {
    constructor(
        public navCtrl: NavController
    ) {

    }
    forward() {
        
    }
    details() {
        console.log(2321)
        this.navCtrl.push(DetailsPage)
    }
}