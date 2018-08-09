import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from './details/details';
import { addCardPage } from './addCard/addCard';
import { forwardPage } from './forward/forward';

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
        this.navCtrl.push(forwardPage)
    }
    details() {
        console.log(2321)
        this.navCtrl.push(DetailsPage)
    }
    addCard() {
        this.navCtrl.push(addCardPage)
    }
}