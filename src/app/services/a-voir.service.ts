import { Video } from '../models/video.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class AVoirService {

  aVoir: Video[] = [];
  aVoirSubject = new Subject<Video[]>();

  constructor() {}

  emitAVoir() {
      this.aVoirSubject.next(this.aVoir);
    }

  saveAVoir() {
      firebase.database().ref('/aVoir').set(this.aVoir);
  }

  getAVoir() {
      firebase.database().ref('/aVoir')
      .on('value', (data: DataSnapshot) => {
          this.aVoir = data.val() ? data.val() : [];
          this.emitAVoir();
      }
      );
  }

  newId() {
      let len = this.aVoir.length;
      let max = 0;
      if (len > 0) {
        while (len--) {
          if (this.aVoir[len].id > max) {
          max = this.aVoir[len].id;
          }
        }
      }
      return max + 1;
  }

  createNewAVoir(newVideo: Video) {
      this.aVoir.push(newVideo);
      this.saveAVoir();
      this.emitAVoir();
  }

  removeAVoir(video: Video) {
    const aVoirIndexToRemove = this.aVoir.findIndex(
        (videoEl) => {
            if (videoEl === video) {
                return true;
            }
        }
    );
    this.aVoir.splice(aVoirIndexToRemove, 1);
    this.saveAVoir();
    this.emitAVoir();
  }
}
