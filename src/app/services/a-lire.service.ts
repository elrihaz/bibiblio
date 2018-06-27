import { Book } from '../models/book.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})

export class ALireService {

  aLire: Book[] = [];
  aLireSubject = new Subject<Book[]>();

  constructor() {}

  emitALire() {
      this.aLireSubject.next(this.aLire);
    }

  saveALire() {
      firebase.database().ref('/aLire').set(this.aLire);
  }

  getALire() {
      firebase.database().ref('/aLire')
      .on('value', (data: DataSnapshot) => {
          this.aLire = data.val() ? data.val() : [];
          this.emitALire();
      }
      );
  }

  newId() {
      let len = this.aLire.length;
      let max = 0;
      if (len > 0) {
        while (len--) {
          if (this.aLire[len].id > max) {
          max = this.aLire[len].id;
          }
        }
      }
      return max + 1;
  }

  createNewALire(newBook: Book) {
      this.aLire.push(newBook);
      this.saveALire();
      this.emitALire();
  }

  removeALire(book: Book) {
    const aLireIndexToRemove = this.aLire.findIndex(
        (bookEl) => {
            if (bookEl === book) {
                return true;
            }
        }
    );
    this.aLire.splice(aLireIndexToRemove, 1);
    this.saveALire();
    this.emitALire();
  }

}
