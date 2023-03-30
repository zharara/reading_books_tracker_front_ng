import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Book } from "../../data/books-data";
import { ToastrService } from "ngx-toastr";
import { AddBookComponent } from "../add-book/add-book.component";
import { BookService } from "../services/book.service";
import { SetReadingPageComponent } from "../set-reading-page/set-reading-page.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-book-actions",
  templateUrl: "./book-actions.component.html",
  styleUrls: ["./book-actions.component.scss"],
})
export class BookActionsComponent implements OnInit {
  @Input() book: Book ;
  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    private service: BookService,
    private router: Router
  ) {
    this.book = Object()
  }

  ngOnInit(): void {}

  getBooks() {
    this.service.getBooksData();
  }

  updateBook(book: any) {
    const dialogRef = this.dialog.open(AddBookComponent, {
      width: "750px",
      height: "600px",
      data: book,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.getBooks();
      }
    });
  }

  showBookInfo(book: Book) {
    this.router.navigate([
      "/dashboard/books/info",
      { book: JSON.stringify(book) },
    ]);
  }

  setBookReadingPage(book: any) {
    const dialogRef = this.dialog.open(SetReadingPageComponent, {
      width: "750px",
      height: "400px",
      data: book,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.getBooks();
      }
    });
  }

  deleteBook(book: any) {
    this.service.deleteBook(book.id);
    this.toastr.success("Book Deleted Succesfully", "Success");
  }
}
