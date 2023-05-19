import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AddCategoryComponent } from "../add-category/add-category.component";
import { Category } from "../../models/category";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CategoryService } from "../services/category.service";

@Component({
  selector: "app-list-categories",
  templateUrl: "./list-categories.component.html",
})
export class ListCategoriesComponent implements OnInit {
  categories: Category[] = [];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private service: CategoryService
  ) {
    this.getCategoriesDataFromSubject();
  }

  ngOnInit(): void {
    this.getCategoriesFromServer();
  }

  getCategoriesFromServer() {
    this.service.reloadCategoriesFromServer();
  }

  getCategoriesDataFromSubject() {
    this.service.bookCategoriesData.subscribe((res: any) => {
      this.categories = res.data;
    });
  }

  addCategory(): void {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: "750px",
      height: "300px",
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        //
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
        //
      }
    });
  }

  deleteCategory(category: any) {
    this.service.deleteCategory(category._id).subscribe((res: any) => {
      this.service.deleteLocally(res);
      this.toastr.success("Category Deleted Succesfully", "Success");
    });
  }
}
