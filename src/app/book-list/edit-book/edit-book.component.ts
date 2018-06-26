import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BooksService } from '../../services/books.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})

export class EditBookComponent implements OnInit, OnDestroy {

  bookForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  books: Book[];
  booksSubscription: Subscription;
  book: Book;

  constructor(  private booksService: BooksService,
                private router: Router,
                private formBuilder: FormBuilder,
                private route: ActivatedRoute) { }

  ngOnInit() {
    this.booksSubscription = this.booksService.booksSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );
    this.booksService.getBooks();
    this.booksService.emitBooks();

    const id = this.route.snapshot.params['id'];
    this.book = this.booksService.getSingleBook(+id);

    this.initForm();
  }

  initForm() {
    this.bookForm = this.formBuilder.group({
      title: [this.book.title, Validators.required],
      authorFirstName: [this.book.authorFirstName, Validators.required],
      authorLastName: [this.book.authorLastName, Validators.required],
      synopsis: this.book.synopsis
    });
  }

  onSaveBook() {
    this.book.title = this.bookForm.get('title').value;
    this.book.authorFirstName = this.bookForm.get('authorFirstName').value;
    this.book.authorLastName = this.bookForm.get('authorLastName').value;
    this.book.synopsis = this.bookForm.get('synopsis').value;

    if (this.fileUrl && this.fileUrl !== '') {
      this.book.photo = this.fileUrl;
    }

    this.booksService.editBook(this.book);
    this.router.navigate(['/books']);
  }

  onUploadFile(file: File) {
    // effacer la photo precedente
    if (this.book.photo) {
      const storageRef = firebase.storage().refFromURL(this.book.photo);
      storageRef.delete().then(
          () => {
              console.log('Photo removed !');
          },
          (error) => {
              console.log('Could not remove photo : ' + error);
          }
      );
    }

    this.fileIsUploading = true;

    this.booksService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }

  onBack() {
    this.router.navigate(['/books']);
  }

  ngOnDestroy() {
    this.booksSubscription.unsubscribe();
  }

}
