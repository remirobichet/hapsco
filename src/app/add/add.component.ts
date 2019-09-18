import { Component, OnInit } from '@angular/core';
import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;

import { Hapsco } from '../_models/hapsco.model';
import { HapscoService } from '../_services/hapsco.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass']
})
export class AddComponent implements OnInit {

  hapsco: Hapsco = new Hapsco();
  formValue: number;

  constructor(private hapscoService: HapscoService) { }

  ngOnInit() { }

  addHapsco() {
    this.hapsco.value = this.formValue;
    this.hapsco.date = Timestamp.fromDate(new Date());
    this.hapscoService.createHapsco(this.hapsco);
  }

}
