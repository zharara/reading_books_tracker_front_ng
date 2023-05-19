import { Injectable } from "@angular/core";
import { User } from "../../dashboard/models/user";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<Object> {
    return this.http.post(environment.baseApi + "/auth/login", credentials);
  }

  register(user: any): Observable<Object> {
    return this.http.post(environment.baseApi + "/auth/register", user);
  }
}
