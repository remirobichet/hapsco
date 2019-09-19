import { Hapsco } from '../_models/hapsco.model';

export class DateUtils {
    static fireBaseDateToDate(e: firebase.firestore.Timestamp): Date {
        return new Date(e.toDate());
    }

    static sortByDate(e: Hapsco[]): Hapsco[] {
        return e.sort((a, b) => (a.date.seconds > b.date.seconds) ? 1 : ((b.date.seconds > a.date.seconds) ? -1 : 0));
    }
}
