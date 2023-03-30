import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBookComponent } from './add-book/add-book.component';
import { ListBooksComponent } from './list-books/list-books.component';
import { RouterModule } from '@angular/router';
import { BooksRoutes } from './books.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { SetReadingPageComponent } from './set-reading-page/set-reading-page.component';
import { SearchBooksComponent } from './search-books/search-books.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BookInfoComponent } from './book-info/book-info.component';
import { DashboardSharedModule } from '../shared/dashboard.shared.module';
import { BookActionsComponent } from './book-actions/book-actions.component';


@NgModule({
  declarations: [
    AddBookComponent,
    ListBooksComponent,
    SetReadingPageComponent,
    SearchBooksComponent,
    BookInfoComponent,
    BookActionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(BooksRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgbModule,
    DashboardSharedModule
  ],
  exports: [BookActionsComponent]
})
export class BooksModule { }
