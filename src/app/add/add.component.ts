import { Component, OnInit } from '@angular/core';
import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;

import { Hapsco } from '../_models/hapsco.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass']
})
export class AddComponent implements OnInit {

  hapsco:Hapsco = new Hapsco();
  formValue: number;

  constructor() { }

  ngOnInit() { }

  addHapsco() {
    this.hapsco.value = this.formValue;
    this.hapsco.date = Timestamp.fromDate(new Date());
    console.log(this.hapsco);
  }

}
