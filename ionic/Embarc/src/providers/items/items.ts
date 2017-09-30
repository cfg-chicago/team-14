import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Item } from '../../models/item';
import { Api } from '../api/api';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class Items {

  items: Item[] = [];

  constructor(public http: HttpClient, public api: Api) {
  }

  query(params?: any) {

      this.http.get('http://34.201.17.154:3000/getListJourneys').subscribe(journeys => {
        var num:number = 0;
        while (num < journeys['length']) {
          this.items.push(new Item(journeys[num]));
          console.log(journeys[num]);
          num++;
        }
        console.log(this.items);
      });

      return this.items;
  }

  add(item: Item) {

  }

  delete(item: Item) {

  }

}
