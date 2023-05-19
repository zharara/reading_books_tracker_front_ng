import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Book, CreateOrUpdateBook } from "../../models/book";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class BookService {
  booksData = new BehaviorSubject<{
    data: Book[];
    totalCount: number;
  }>({
    data: [],
    totalCount: 0,
  });

  constructor(private http: HttpClient) {}

  reloadBooksFromServer(filter?: any) {
    this.getAllBooks(filter).subscribe(
      (res: any) => {
        console.log(res);

        this.booksData.next({
          data: res,
          totalCount: res.length,
        });
      },
      (error: any) => {
        console.log(error.status);
        console.log(error.error);
      }
    );
  }

  getAllBooks(filter?: any): Observable<Object> {
    var filterQuery: string = "";

    if (filter?.searchByBookTitle != null && filter?.searchByBookTitle != "") {
      filterQuery = filterQuery + "?titleKeyword=" + filter?.searchByBookTitle;

      if (
        filter?.searchByBookAuthors != null &&
        filter?.searchByBookAuthors != ""
      ) {
        filterQuery =
          filterQuery + "&authorsKeyword=" + filter?.searchByBookAuthors;
      }
    } else if (
      filter?.searchByBookAuthors != null &&
      filter?.searchByBookAuthors != ""
    ) {
      filterQuery =
        filterQuery + "?authorsKeyword=" + filter?.searchByBookAuthors;
    }

    return this.http.get(environment.baseApi + "/books/get-all" + filterQuery);
  }

  getBooksOfCategory(categoryId: string): Observable<Object> {
    return this.http.get(
      environment.baseApi + "/books/get-books-of-category/" + categoryId
    );
  }

  createBook(createBook: CreateOrUpdateBook): Observable<Object> {
    return this.http.post(environment.baseApi + "/books/create", createBook);
  }

  addLocally(res: Book) {
    var newData: Book[] = this.booksData.value.data;
    var newLength = newData.push(res);

    this.booksData.next({
      data: newData,
      totalCount: newLength,
    });
  }

  updateBook(toUpdateBook: CreateOrUpdateBook, id: string): Observable<Object> {
    return this.http.put(
      environment.baseApi + "/books/update/" + id,
      toUpdateBook
    );
  }

  updateLocally(res: Book) {
    var newData: Book[] = this.booksData.value.data;
    var index = newData.findIndex((b: Book) => b._id == res._id);
    newData[index] = res;

    this.booksData.next({
      data: newData,
      totalCount: newData.length,
    });
  }

  deleteBook(id: string): Observable<Object> {
    return this.http.delete(environment.baseApi + "/books/delete/" + id);
  }

  deleteLocally(res: Book) {
    var newData: Book[] = this.booksData.value.data;
    var index = newData.findIndex((b: Book) => b._id == res._id);
    newData.splice(index, 1);

    this.booksData.next({
      data: newData,
      totalCount: newData.length,
    });
  }
}
