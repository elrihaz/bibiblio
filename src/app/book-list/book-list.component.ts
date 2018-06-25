import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from '../models/book.model';
import { Subscription } from 'rxjs';
import { BooksService } from '../services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})

export class BookListComponent implements OnInit, OnDestroy {

  books: Book[];
  booksSubscription: Subscription;

  constructor(  private booksService: BooksService,
                private router: Router) { }

  ngOnInit() {
    this.booksSubscription = this.booksService.booksSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );
    this.booksService.getBooks();
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
    this.booksService.triTitreBooks(this.books);
  }

  onTriAuteur() {
    this.booksService.triAuteurBooks(this.books);
  }


  ngOnDestroy() {
    this.booksSubscription.unsubscribe();
  }

}
