import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Items } from '../../providers/providers';
import {Api} from "../../providers/api/api";

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;
  rating: number = -1;
  entry: string = "";
  createEntry: boolean = false;

  constructor(public navCtrl: NavController, navParams: NavParams, items: Items, api: Api) {

    this.item = navParams.get('item');
    api.get(`getJourney?id=${this.item.id}&userid=3&type=student`).subscribe(
      response => {

        //console.log(response);
        if(response['result']=="already_made_journal") {
          console.log("made a journal entry");
          this.displayResult(response);
        } else {
          console.log("didnt make a journal entry");
          this.promptUserEntry();
        }
      }
    )
  }
  public displayResult(response) {
    this.rating = response.rating;
    this.entry = response.diary;
  }

  public promptUserEntry() {
    this.createEntry = true;
  }

}
