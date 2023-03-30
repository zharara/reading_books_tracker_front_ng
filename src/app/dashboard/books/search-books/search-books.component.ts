import { Component, OnInit } from "@angular/core";
import { Book, Books } from "../../data/books-data";
import { BookService } from "../services/book.service";
import {Location} from '@angular/common';

@Component({
  selector: "app-search-books",
  templateUrl: "./search-books.component.html",
  styleUrls: ["./search-books.component.scss"],
})
export class SearchBooksComponent implements OnInit {
  searchedBooks: Book[];
  filteration: any = {
    searchByBookTitle: "",
    searchByBookAuthors: "",
  };

  timeOutId: any;

  constructor(private service: BookService, private _location: Location) {
    this.searchedBooks = Books;
  }

  ngOnInit(): void {}

  back() {
    this._location.back();
  }

  searchBooks() {
    var newBooks = this.service.getAllBooks(this.filteration);
    console.log(newBooks);

    this.searchedBooks = newBooks;
  }

  searchByBookTitle(event: any) {
    this.filteration["searchByBookTitle"] = event.value;
    clearTimeout(this.timeOutId);
    this.timeOutId = setTimeout(() => {
      this.searchBooks();
    }, 1000);
  }

  searchByAuthor(event: any) {
    this.filteration["searchByBookAuthors"] = event.value;
    clearTimeout(this.timeOutId);
    this.timeOutId = setTimeout(() => {
      this.searchBooks();
    }, 1000);
  }
}
