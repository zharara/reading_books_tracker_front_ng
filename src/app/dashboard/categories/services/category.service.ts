import { Injectable } from "@angular/core";
import { Category } from "../../models/category";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  bookCategoriesData = new BehaviorSubject<{
    data: Category[];
    totalCount: number;
  }>({
    data: [],
    totalCount: 0,
  });

  constructor(private http: HttpClient) {}

  reloadCategoriesFromServer(filter?: any) {
    this.getAllCategories().subscribe(
      (res: any) => {
        console.log(res);

        this.bookCategoriesData.next({
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

  getAllCategories() {
    return this.http.get(environment.baseApi + "/book-categories/get-all");
  }

  createCategory(createCategory: any): Observable<Object> {
    return this.http.post(
      environment.baseApi + "/book-categories/create",
      createCategory
    );
  }

  addLocally(res: Category) {
    var newData: Category[] = this.bookCategoriesData.value.data;
    var newLength = newData.push(res);

    this.bookCategoriesData.next({
      data: newData,
      totalCount: newLength,
    });
  }

  updateCategory(toUpdateCategory: any, id: string) {
    return this.http.put(
      environment.baseApi + "/book-categories/update/" + id,
      toUpdateCategory
    );
  }

  updateLocally(res: Category) {
    var newData: Category[] = this.bookCategoriesData.value.data;
    var index = newData.findIndex((b: Category) => b._id == res._id);
    newData[index] = res;

    this.bookCategoriesData.next({
      data: newData,
      totalCount: newData.length,
    });
  }

  deleteCategory(id: string) {
    return this.http.delete(
      environment.baseApi + "/book-categories/delete/" + id
    );
  }

  deleteLocally(res: Category) {
    var newData: Category[] = this.bookCategoriesData.value.data;
    var index = newData.findIndex((b: Category) => b._id == res._id);
    newData.splice(index, 1);

    this.bookCategoriesData.next({
      data: newData,
      totalCount: newData.length,
    });
  }
}
