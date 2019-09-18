import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Hapsco } from '../_models/hapsco.model';

@Injectable({
  providedIn: 'root'
})
export class HapscoService {
  constructor(private db: AngularFirestore) { }

  getHapsco() {
    return this.db.collection('items').valueChanges();
  }

  createHapsco(hapsco: Hapsco){
    return this.db.collection('policies').add(hapsco);
  }

  updateHapsco(hapsco: Hapsco){
    delete hapsco.date;
    this.db.doc('policies/' + hapsco.date).update(hapsco);
  }

  deleteHapsco(hapscoId: string){
    this.db.doc('policies/' + hapscoId).delete();
  }
}
