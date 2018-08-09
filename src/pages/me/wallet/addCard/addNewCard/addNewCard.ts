import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'add-new-card',
    templateUrl: 'addNewCard.html'
})

export class addNewCardPage {
    constructor(
        public navCtrl: NavController
    ) {

    }
}