import { Component, OnInit } from '@angular/core';
import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;

import { Hapsco } from '../_models/hapsco.model';
import { HapscoService } from '../_services/hapsco.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {

  hapsco: Hapsco = new Hapsco();
  formValue: number;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];


  constructor(private hapscoService: HapscoService) { }

  ngOnInit() { }

  addHapsco() {
    this.hapsco.value = this.formValue;
    this.hapsco.date = Timestamp.fromDate(new Date());
    this.hapscoService.createHapsco(this.hapsco);
  }

}
