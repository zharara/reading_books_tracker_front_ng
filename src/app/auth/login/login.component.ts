import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UsersService } from "../services/users.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private service: UsersService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  loginForm!: FormGroup;
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      rememberMe: [true],
    });
  }

  login() {
    let user = this.service.login(this.loginForm.value);
    if (user != null) {
      localStorage.setItem("auth-token", "token-xyz");
      localStorage.setItem("user", JSON.stringify(user));
      this.toastr.success("Login Success", "Success");
      this.router.navigate(["/dashboard/books/list"]);
    } else {
      this.toastr.error("Invalid email or password!", "Auth Faild");
    }
  }
}
