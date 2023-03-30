import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "../../dashboard/data/users-data";
import { ToastrService } from "ngx-toastr";
import { UsersService } from "../services/users.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private service: UsersService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  registerForm!: FormGroup;
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group(
      {
        firstName: ["", [Validators.required, Validators.minLength(2)]],
        email: ["", [Validators.required, Validators.email]],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(20),
          ],
        ],
        rePassword: [
          "",
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(20),
          ],
        ],
        agreeTerms: [false, Validators.requiredTrue],
      },
      { validators: this.checkPassword }
    );
  }

  checkPassword: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let password = group.get("password")?.value;
    let rePassword = group.get("rePassword")?.value;
    return password === rePassword ? null : { notSame: true };
  };

  register() {
    let user = this.service.register(this.registerForm.value);
    if (user != null) {
      localStorage.setItem("auth-token", "token-xyz");
      localStorage.setItem("user", JSON.stringify(user));
      this.toastr.success("Register Success", "Success");
      this.router.navigate(["/dashboard/books/list"]);
    } else {
      this.toastr.error("Invalid data", "Auth Faild");
    }
  }
}
