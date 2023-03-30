import { Routes } from '@angular/router';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CategoryBooksComponent } from './category-books/category-books.component';
import { ListCategoriesComponent } from './list-categories/list-categories.component';


export const CategoriesRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'list',
				component: ListCategoriesComponent
			},
			{
				path: 'add',
				component: AddCategoryComponent
			},
			{
				path: 'category-books',
				component: CategoryBooksComponent
			}
		]
	}
];
