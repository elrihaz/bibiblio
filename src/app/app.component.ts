import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor() {
    // Initialize Firebase
    const config = {
    apiKey: 'AIzaSyBq2AnT0RTtbDRqKlCNDtJu32Fs0iNKmJg',
    authDomain: 'bibiblio-13523.firebaseapp.com',
    databaseURL: 'https://bibiblio-13523.firebaseio.com',
    projectId: 'bibiblio-13523',
    storageBucket: 'bibiblio-13523.appspot.com',
    messagingSenderId: '103415345345'
    };
  firebase.initializeApp(config);
  }

}
