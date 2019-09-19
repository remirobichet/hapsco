import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

import { Hapsco } from '../_models/hapsco.model';
import { HapscoService } from '../_services/hapsco.service';
import { DateUtils } from '../_helpers/date.utile';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {

  hapsco: Hapsco = new Hapsco();
  formValue: number;

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
    this.hapsco.date = firebase.firestore.Timestamp.fromDate(new Date());
    this.hapscoService.createHapsco(this.hapsco);
  }

  deleteHapsco(hapsco) {
    this.hapscoService.deleteHapsco(hapsco);
  }

  toFirebaseDate(date: firebase.firestore.Timestamp): Date {
    return DateUtils.fireBaseDateToDate(date);
  }

}
