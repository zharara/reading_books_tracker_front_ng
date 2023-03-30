import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BookService } from "../../books/services/book.service";
import { Book } from "../../data/books-data";
import { Category } from "../../data/categories-data";
import { Location } from "@angular/common";

@Component({
  selector: "app-category-books",
  templateUrl: "./category-books.component.html",
  styleUrls: ["./category-books.component.scss"],
})
export class CategoryBooksComponent implements OnInit {
  category: Category | null = null;
  books: Book[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private _location: Location,
    private service: BookService
  ) {}

  ngOnInit(): void {
    this.category = JSON.parse(this.activatedRoute.snapshot.params.category);
    this.getBooks();
  }

  back() {
    this._location.back();
  }

  getBooks() {
    this.books = this.service.getBooksOfCategory(this.category?.id);
  }
}
