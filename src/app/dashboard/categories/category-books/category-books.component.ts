import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BookService } from "../../books/services/book.service";
import { Book } from "../../models/book";
import { Category } from "../../models/category";
import { Location } from "@angular/common";

@Component({
  selector: "app-category-books",
  templateUrl: "./category-books.component.html",
  styleUrls: ["./category-books.component.scss"],
})
export class CategoryBooksComponent implements OnInit {
  category: Category;
  books: Book[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private _location: Location,
    private service: BookService
  ) {
    this.category = JSON.parse(this.activatedRoute.snapshot.params.category);
  }

  ngOnInit(): void {
    this.getBooks();
  }

  back() {
    this._location.back();
  }

  getBooks() {
    this.service.getBooksOfCategory(this.category._id).subscribe((res: any) => {
      this.books = res;
    });
  }
}
