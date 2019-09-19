
import * as firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;
export class Hapsco {
  id: string;
  date: Timestamp;
  value: number;
}
