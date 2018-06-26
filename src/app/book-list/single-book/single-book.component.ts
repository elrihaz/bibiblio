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

  constructor(  private booksService: BooksService,
                private router: Router,
                private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.book = this.booksService.getSingleBook(+this.id);
  }

  onBack() {
    this.router.navigate(['/books']);
  }

  onEditBook(id: number) {
    this.router.navigate(['/books', 'edit', id]);
  }

}
