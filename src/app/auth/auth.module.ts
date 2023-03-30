import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { RouterModule } from "@angular/router";
import { AuthRoutes } from "./auth.routing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../dashboard/material/material.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgbModule
  ],
})
export class AuthModule {}
