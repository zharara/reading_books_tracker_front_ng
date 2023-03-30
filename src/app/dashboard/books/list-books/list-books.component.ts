import { Component, OnInit } from "@angular/core";
import { Book, Books } from "../../data/books-data";
import { MatDialog } from "@angular/material/dialog";
import { AddBookComponent } from "../add-book/add-book.component";
import { BookService } from "../services/book.service";
import { SetReadingPageComponent } from "../set-reading-page/set-reading-page.component";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-list-books",
  templateUrl: "./list-books.component.html",
  styleUrls: ["./list-books.component.scss"],
})
export class ListBooksComponent implements OnInit {
  books: Book[] = [];

  constructor(public dialog: MatDialog,
    private toastr: ToastrService,
    private service: BookService) {
    this.getBooksDataFromSubject();
  }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.service.getBooksData();
  }

  getBooksDataFromSubject() {
    this.service.booksData.subscribe((res: any) => {
      this.books = res.data;
    });
  }

  addBook(): void {
    const dialogRef = this.dialog.open(AddBookComponent, {
      width: "750px",
      height: "600px",
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.getBooks();
      }
    });
  }
}
