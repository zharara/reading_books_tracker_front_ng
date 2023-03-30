import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgApexchartsModule } from "ng-apexcharts";
import { DashboardComponent } from "./dashboard.component";
import { NavigationComponent } from "./layout/header/navigation.component";
import { SidebarComponent } from "./layout/sidebar/sidebar.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {

  DashboardRoutingModule,
} from "./dashboard-routing.module";

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DashboardRoutingModule,
    NgApexchartsModule,
    NgbModule,
  ],
  declarations: [DashboardComponent, NavigationComponent, SidebarComponent],
})
export class DashboardModule {}
