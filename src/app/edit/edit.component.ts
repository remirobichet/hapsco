import { Component, OnInit, ViewChild } from '@angular/core';
import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { Hapsco } from '../_models/hapsco.model';
import { HapscoService } from '../_services/hapsco.service';
import { DateUtils } from '../_helpers/date.utile';
import { DatePipe } from '@angular/common';
import { isNullOrUndefined } from 'util';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  formValue: number = 50;
  formDescription: string;
  formDate: FormControl = new FormControl(new Date());

  displayedColumns: string[] = ['date', 'value', 'description', 'actions'];
  dataSource: MatTableDataSource<Hapsco>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public datepipe: DatePipe, private hapscoService: HapscoService, public dialog: MatDialog) { }

  ngOnInit() {
    this.sort.sort(<MatSortable>{
        id: 'date',
        start: 'desc'
      }
    );
    this.hapscoService.getHapsco().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data.map(e => {
        return {
          id: e.payload.doc.id,
          trashVisible: false,
          ...e.payload.doc.data()
        } as Hapsco;
      }));
      DateUtils.sortByDate(this.dataSource.data);
      if (Array.isArray(this.dataSource.data) && this.dataSource.data.length) {
        let lastDate = new Date(this.dataSource.data.slice(-1).pop().date.toDate());
        let lastDatePlusOneDay = new Date(this.dataSource.data.slice(-1).pop().date.toDate());
        lastDatePlusOneDay.setDate(lastDate.getDate() + 1);
        this.formDate = new FormControl(new Date(lastDatePlusOneDay));
      } else {
        this.formDate = new FormControl(new Date());
      }
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  addHapsco() {
    let newHapsco: Hapsco = new Hapsco();
    newHapsco.value = this.formValue;
    newHapsco.description = this.formDescription ? this.formDescription : '';
    newHapsco.date = Timestamp.fromDate(new Date(this.formDate.value));
    if (!isNullOrUndefined(this.formValue)) {
      this.hapscoService.createHapsco(newHapsco);
    }
  }

  updateHapsco(hapsco) {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '320px',
      data: hapsco
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!isNullOrUndefined(result)) {
        this.hapscoService.updateHapsco(result);
      }
    });
  }

  deleteHapsco(hapsco) {
    this.hapscoService.deleteHapsco(hapsco);
  }

  fromFirebaseToDate(date: Timestamp): Date {
    return DateUtils.fireBaseDateToDate(date);
  }

}
