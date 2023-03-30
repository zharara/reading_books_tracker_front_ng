import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { RouterModule } from '@angular/router';
import { CategoriesRoutes } from './categories.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { CategoryBooksComponent } from './category-books/category-books.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    declarations: [
        ListCategoriesComponent,
        AddCategoryComponent,
        CategoryBooksComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(CategoriesRoutes),
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        NgbModule,
    ]
})
export class CategoriesModule { }
