import { Routes } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { BookInfoComponent } from './book-info/book-info.component';
import { ListBooksComponent } from './list-books/list-books.component';
import { SearchBooksComponent } from './search-books/search-books.component';


export const BooksRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'list',
				component: ListBooksComponent
			},
			{
				path: 'info',
				component: BookInfoComponent
			},
			{
				path: 'search',
				component: SearchBooksComponent
			}
		]
	}
];
