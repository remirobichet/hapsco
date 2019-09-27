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
    let id = hapsco.id;
    delete hapsco.id;
    this.db.doc('items/' + id).update(hapsco);
  }

  deleteHapsco(hapscoId: string) {
    this.db.doc('items/' + hapscoId).delete();
  }
}
