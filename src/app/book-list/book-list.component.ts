import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from '../models/book.model';
import { Subscription } from 'rxjs';
import { BooksService } from '../services/books.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})

export class BookListComponent implements OnInit, OnDestroy {

  books: Book[];
  booksSubscription: Subscription;

  filterCritere: string;

  constructor(  private booksService: BooksService,
                private router: Router) { }

  ngOnInit() {
    this.filterCritere = this.booksService.filterCritere;

    this.booksSubscription = this.booksService.booksSubject
    .subscribe(
      (books: Book[]) => {
        this.books = books.filter(
          (el) => {
            return (el.authorLastName.toLowerCase().indexOf(this.booksService.filterCritere.toLowerCase()) > -1 ||
            el.authorFirstName.toLowerCase().indexOf(this.booksService.filterCritere.toLowerCase()) > -1 ||
            el.title.toLowerCase().indexOf(this.booksService.filterCritere.toLowerCase()) > -1);
            }
        );
      }
    );

    this.booksService.getBooks();
    this.booksService.emitBooks();
  }

  onFilterBook(form: NgForm) {
    this.booksService.filterCritere = form.value['filterCritere'];
    this.booksService.emitBooks();
  }

  onDeleteCritere() {
    this.filterCritere = '';
    this.booksService.filterCritere = '';
    this.booksService.emitBooks();
  }

  onNewBook() {
    this.router.navigate(['/books', 'new']);
  }

  onEditBook(id: number) {
    this.router.navigate(['/books', 'edit', id]);
  }

  onDeleteBook(book: Book) {
    if (confirm('Etes-vous sûr(e) de vouloir supprimer ce livre ?')) {
      this.booksService.removeBook(book);
    }
  }

  onViewBook(id: number) {
    this.router.navigate(['/books', 'view', id]);
  }

  onTriTitre() {
    this.booksService.critereTri = 'titre';
    this.booksService.emitBooks();
  }

  onTriAuteur() {
    this.booksService.critereTri = 'auteur';
    this.booksService.emitBooks();
  }


  ngOnDestroy() {
    this.booksSubscription.unsubscribe();
  }

}
