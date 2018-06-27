import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ALireService } from '../../services/a-lire.service';
import { Router } from '@angular/router';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-a-lire-new',
  templateUrl: './a-lire-new.component.html',
  styleUrls: ['./a-lire-new.component.scss']
})

export class ALireNewComponent implements OnInit {

  bookForm: FormGroup;

  constructor(  private aLireService: ALireService,
                private router: Router,
                private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      authorFirstName: ['', Validators.required],
      authorLastName: ['', Validators.required],
    });
  }

  onSaveALire() {
    const title = this.bookForm.get('title').value;
    const authorFirstName = this.bookForm.get('authorFirstName').value;
    const authorLastName = this.bookForm.get('authorLastName').value;
    const id = this.aLireService.newId();

    const newBook = new Book(id, title, authorFirstName, authorLastName);

    this.aLireService.createNewALire(newBook);
    this.router.navigate(['/a-lire']);
  }

  onBack() {
    this.router.navigate(['/a-lire']);
  }

}
