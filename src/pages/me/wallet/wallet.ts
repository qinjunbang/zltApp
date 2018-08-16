import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from './details/details';
import { addCardPage } from './addCard/addCard';
import { forwardPage } from './forward/forward';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'wallet-page',
    templateUrl: 'wallet.html'
})

export class WalletPage {
    public user = '';
    constructor(
        public navCtrl: NavController,
        public storage: Storage
    ) {
        this.storage.get('userInfo').then((val) => {
            console.log(val)
            this.user = val
        });
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