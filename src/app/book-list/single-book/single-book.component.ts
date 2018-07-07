import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BooksService } from '../../services/books.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})

export class SingleBookComponent implements OnInit {

  book: Book;
  id: number;
  index: number;
  maxIndex: number;
  listBooks: Book[];

  constructor(  private booksService: BooksService,
                private router: Router,
                private route: ActivatedRoute) {}

  ngOnInit() {
    this.listBooks = this.booksService.books.filter(
      (el) => {
        return (el.authorLastName.toLowerCase().indexOf(this.booksService.filterCritere.toLowerCase()) > -1 ||
        el.authorFirstName.toLowerCase().indexOf(this.booksService.filterCritere.toLowerCase()) > -1 ||
        el.title.toLowerCase().indexOf(this.booksService.filterCritere.toLowerCase()) > -1);
        }
    );
    this.maxIndex = this.listBooks.length - 1;
    this.id = this.route.snapshot.params['id'];
    this.book = this.booksService.getSingleBook(+this.id);
    this.index = this.listBooks.findIndex(BookEl => BookEl.id === +this.id);
  }

  onBack() {
    this.router.navigate(['/books']);
  }

  onEditBook(id: number) {
    this.router.navigate(['/books', 'edit', id]);
  }

  onNext() {
    this.book = this.listBooks[this.index + 1];
    this.index = this.listBooks.findIndex(BookEl => BookEl.id === +this.book.id);
  }

  onPrevious() {
    this.book = this.listBooks[this.index - 1];
    this.index = this.listBooks.findIndex(BookEl => BookEl.id === +this.book.id);
  }

}
