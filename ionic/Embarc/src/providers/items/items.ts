import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Item } from '../../models/item';
import { Api } from '../api/api';

@Injectable()
export class Items {
  items: Item[] = [];

  defaultItem: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
  };

  constructor(public http: Http, public api: Api) {
  }

  query(params?: any) {
    return this.api.get('/getListJourneys', params);

  }

  add(item: Item) {
  }

  delete(item: Item) {
  }

}
