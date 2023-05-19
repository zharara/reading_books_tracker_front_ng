import { Component, OnInit } from "@angular/core";
import { Book } from "../../models/book";
import { BookService } from "../services/book.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-search-books",
  templateUrl: "./search-books.component.html",
  styleUrls: ["./search-books.component.scss"],
})
export class SearchBooksComponent implements OnInit {
  searchedBooks: Book[] = [];
  filteration: any = {
    searchByBookTitle: "",
    searchByBookAuthors: "",
  };

  timeOutId: any;

  constructor(private service: BookService, private _location: Location) {
    // this.service.booksData.subscribe((res: any) => {
    //   this.searchedBooks = res.data;
    // });
  }

  ngOnInit(): void {}

  back() {
    this._location.back();
  }

  searchBooks() {
    this.service.getAllBooks(this.filteration).subscribe((res: any) => {
      console.log(res);
      
      this.searchedBooks = res;
    });
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
