import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { addNewCardPage } from './addNewCard/addNewCard'

@Component({
    selector: 'add-card',
    templateUrl: 'addCard.html'
})

export class addCardPage {
    constructor(
        public navCtrl: NavController
    ) {

    }
    addCard() {
        this.navCtrl.push(addNewCardPage)
    }
}