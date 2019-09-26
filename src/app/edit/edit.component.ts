import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;
import { FormControl } from '@angular/forms';

import { Hapsco } from '../_models/hapsco.model';
import { HapscoService } from '../_services/hapsco.service';
import { DateUtils } from '../_helpers/date.utile';
import { DatePipe } from '@angular/common';
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  hapsco: Hapsco = new Hapsco();
  date = new FormControl(new Date());
  formValue: number = 50;

  displayedColumns: string[] = ['date', 'value', 'actions'];
  dataSource: Hapsco[];


  constructor(public datepipe: DatePipe, private hapscoService: HapscoService) { }

  ngOnInit() {
    this.hapscoService.getHapsco().subscribe((data) => {
      this.dataSource = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Hapsco;
      });
      DateUtils.sortByDate(this.dataSource);
      console.log(this.dataSource);
    });
  }

  addHapsco() {
    this.hapsco.value = this.formValue;
    this.hapsco.date = Timestamp.fromDate(new Date(this.date.value));
    if (!isNullOrUndefined(this.formValue)) {
      this.hapscoService.createHapsco(this.hapsco);
    }
  }

  deleteHapsco(hapsco) {
    this.hapscoService.deleteHapsco(hapsco);
  }

  toFirebaseDate(date: Timestamp): Date {
    return DateUtils.fireBaseDateToDate(date);
  }

}
