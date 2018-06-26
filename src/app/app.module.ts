import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BookListComponent } from './book-list/book-list.component';
import { SingleBookComponent } from './book-list/single-book/single-book.component';
import { BookFormComponent } from './book-list/book-form/book-form.component';
import { HeaderComponent } from './header/header.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { BooksService } from './services/books.service';
import { EditBookComponent } from './book-list/edit-book/edit-book.component';
import { ALireListComponent } from './a-lire-list/a-lire-list.component';
import { AVoirListComponent } from './a-voir-list/a-voir-list.component';
import { ALireService } from './services/a-lire.service';
import { AVoirService } from './services/a-voir.service';

const appRoutes: Routes = [
  {path: 'auth/signup', component: SignupComponent},
  {path: 'auth/signin', component: SigninComponent},
  {path: 'books', canActivate: [AuthGuardService], component: BookListComponent},
  {path: 'books/new', canActivate: [AuthGuardService], component: BookFormComponent},
  {path: 'books/view/:id', canActivate: [AuthGuardService], component: SingleBookComponent},
  {path: 'books/edit/:id', canActivate: [AuthGuardService], component: EditBookComponent},
  {path: 'a-lire', canActivate: [AuthGuardService], component: ALireListComponent},
  {path: 'a-voir', canActivate: [AuthGuardService], component: AVoirListComponent},
  {path: '', redirectTo: 'books', pathMatch: 'full' },
  {path: '**', redirectTo: 'books' }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    BookListComponent,
    SingleBookComponent,
    BookFormComponent,
    HeaderComponent,
    EditBookComponent,
    ALireListComponent,
    AVoirListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthGuardService,
    AuthService,
    BooksService,
    ALireService,
    AVoirService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
