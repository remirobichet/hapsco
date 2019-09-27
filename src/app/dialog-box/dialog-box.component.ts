import { Component, OnInit, Optional, Inject } from '@angular/core';
import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;
import { FormControl } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hapsco } from '../_models/hapsco.model';
import { DateUtils } from '../_helpers/date.utile';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {

  localData: any;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Hapsco) { }


  ngOnInit() {
    this.localData = {...this.data};
    this.localData.date = new FormControl(DateUtils.fireBaseDateToDate(this.data.date));
  }

  doUpdate() {
    this.localData.date = Timestamp.fromDate(new Date(this.localData.date.value));
    this.dialogRef.close(this.localData);
  }

  closeDialog() {
    this.dialogRef.close(null);
  }
}
