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

  date: FormControl = new FormControl(new Date());
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
      if (Array.isArray(this.dataSource) && this.dataSource.length) {
        let lastDate = new Date(this.dataSource.slice(-1).pop().date.toDate());
        let lastDatePlusOneDay = new Date();
        lastDatePlusOneDay.setDate(lastDate.getDate() + 1);
        this.date = new FormControl(new Date(lastDatePlusOneDay));
      } else {
        this.date = new FormControl(new Date());
      }
      console.log(this.dataSource);
    });
  }

  addHapsco() {
    let newHapsco: Hapsco = new Hapsco();
    newHapsco.value = this.formValue;
    newHapsco.date = Timestamp.fromDate(new Date(this.date.value));
    if (!isNullOrUndefined(this.formValue)) {
      this.hapscoService.createHapsco(newHapsco);
    }
  }

  deleteHapsco(hapsco) {
    this.hapscoService.deleteHapsco(hapsco);
  }

  toFirebaseDate(date: Timestamp): Date {
    return DateUtils.fireBaseDateToDate(date);
  }

}
