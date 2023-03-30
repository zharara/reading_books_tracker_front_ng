import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AddCategoryComponent } from "../add-category/add-category.component";
import { Categories, Category } from "../../data/categories-data";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CategoryService } from "../services/category.service";

@Component({
  selector: "app-list-categories",
  templateUrl: "./list-categories.component.html",
})
export class ListCategoriesComponent implements OnInit {
  categories: Category[];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private service: CategoryService
  ) {
    this.categories = Categories;
  }

  ngOnInit(): void {}

  getBooks() {
    this.service.getAllCategories();
  }

  addCategory(): void {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: "750px",
      height: "300px",
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        // this.getAllTasks()
      }
    });
  }

  showCategoryBooks(category: Category) {
    this.router.navigate([
      "/dashboard/categories/category-books",
      { category: JSON.stringify(category) },
    ]);
  }

  updateCategory(category: any) {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: "750px",
      height: "300px",
      data: category,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.getBooks();
      }
    });
  }

  deleteCategory(category: any) {
    this.service.deleteCategory(category.id);
    this.toastr.success("Category Deleted Succesfully", "Success");
  }
}
