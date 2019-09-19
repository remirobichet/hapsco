import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Hapsco } from '../_models/hapsco.model';

@Injectable({
  providedIn: 'root'
})
export class HapscoService {
  constructor(private db: AngularFirestore) { }

  getHapsco() {
    return this.db.collection<Hapsco>('items').snapshotChanges();
  }

  createHapsco(hapsco: Hapsco) {
    return this.db.collection<Hapsco>('items').add({... hapsco});
  }

  updateHapsco(hapsco: Hapsco) {
    delete hapsco.date;
    this.db.doc('items/' + hapsco.date).update(hapsco);
  }

  deleteHapsco(hapscoId: string) {
    this.db.doc('items/' + hapscoId).delete();
  }
}
