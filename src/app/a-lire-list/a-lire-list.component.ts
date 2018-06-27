import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from '../models/book.model';
import { Subscription } from 'rxjs';
import { ALireService } from '../services/a-lire.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-a-lire-list',
  templateUrl: './a-lire-list.component.html',
  styleUrls: ['./a-lire-list.component.scss']
})

export class ALireListComponent implements OnInit, OnDestroy {

  aLire: Book[];
  aLireSubscription: Subscription;

  constructor(  private aLireService: ALireService,
                private router: Router) { }

  ngOnInit() {
    this.aLireSubscription = this.aLireService.aLireSubject
    .subscribe(
      (books: Book[]) => {
        this.aLire = books;
      }
    );

    this.aLireService.getALire();
    this.aLireService.emitALire();
  }

  onNewALire() {
    this.router.navigate(['/a-lire', 'new']);
  }

  onDeleteALire(book: Book) {
    if (confirm('Etes-vous sûr(e) de vouloir supprimer ce livre ?')) {
      this.aLireService.removeALire(book);
    }
  }

  ngOnDestroy() {
    this.aLireSubscription.unsubscribe();
  }

}
