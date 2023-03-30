import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Book, Books } from "../../data/books-data";

@Injectable({
  providedIn: "root",
})
export class BookService {
  booksData = new BehaviorSubject({});

  constructor() {}

  sort(list: Book[]): Book[] {
    return list.sort((n1, n2) => {
      if (n1.timeCreated.getMilliseconds > n2.timeCreated.getMilliseconds) {
        return 1;
      }

      if (n1.timeCreated.getMilliseconds < n2.timeCreated.getMilliseconds) {
        return -1;
      }

      return 0;
    });
  }

  getBooksData() {
    this.booksData.next({
      data: this.sort(Books),
      totalCount: Books.length,
    });
  }

  getAllBooks(filter?: any): Book[] {
    var titleKeyword: string | null = filter?.searchByBookTitle;
    var authorsKeyword: string | null = filter?.searchByBookAuthors;

    if (
      (titleKeyword == "" || titleKeyword == null) &&
      (authorsKeyword == "" || authorsKeyword == null)
    ) {
      return this.sort(Books);
    }

    var searchBooks: Book[] = [];

    if (titleKeyword != "" && titleKeyword != null) {
      searchBooks.push(
        ...Books.filter((b: Book) =>
          b.title.toLowerCase().includes(titleKeyword?.toLowerCase() ?? "")
        )
      );
    }

    if (authorsKeyword != "" && authorsKeyword != null) {
      searchBooks.push(
        ...Books.filter((b: Book) =>
          b.authors.toLowerCase().includes(authorsKeyword?.toLowerCase() ?? "")
        )
      );
    }

    return this.sort(searchBooks);
  }

  getBooksOfCategory(id: any) {
    return this.sort(Books.filter((b: Book) => b.category.id == id));
  }

  createBook(model: Book) {
    return Books.push(model);
  }

  updateBook(model: Book, id: number) {
    var index = Books.findIndex((b: Book) => b.id == id);

    Books[index] = model;

    return index;
  }

  deleteBook(id: number) {
    var index = Books.findIndex((b: Book) => b.id == id);
    Books.splice(index, 1);
  }
}
