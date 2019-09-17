import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  public items: Observable<any[]>;

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.items = this.db.collection('/items').valueChanges();
  }

  // @TODO npm install firebase @angular/fire --save

}
