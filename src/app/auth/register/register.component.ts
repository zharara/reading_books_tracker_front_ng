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
import { User } from "../../dashboard/models/user";
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
        lastName: ["", [Validators.required, Validators.minLength(2)]],
        email: ["", [Validators.required, Validators.email]],
        phone: ["", [Validators.pattern(new RegExp("^[0-9]{10}$"))]],
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
    var newUser = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      phone: this.registerForm.value.phone,
      password: this.registerForm.value.password,
    };

    this.service.register(newUser).subscribe(
      (res: any) => {
        localStorage.setItem("auth-token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        this.toastr.success("Register Success", "Success");
        this.router.navigate(["/dashboard/books/list"]);
      },
      (error: any) => {
        console.log(error.error.message);

        this.toastr.error(error.error.message, "Auth Faild");
      }
    );
  }
}
