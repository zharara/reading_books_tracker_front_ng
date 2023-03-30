import { Injectable } from "@angular/core";
import { User, Users } from "../../dashboard/data/users-data";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  constructor() {}

  login(credentials: any): User | null {
    let foundUser = Users.filter(
      (u) => u.email == credentials.email && u.password == credentials.password
    );

    return foundUser[0];
  }

  register(user: User): User | null {
    Users.push(user);

    return user;
  }
}
