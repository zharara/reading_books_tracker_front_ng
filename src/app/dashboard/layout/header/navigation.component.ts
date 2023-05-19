import { Component, AfterViewInit, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { User } from "../../models/user";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { SidebarComponent } from "../sidebar/sidebar.component";

declare var $: any;

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
})
export class NavigationComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  user: User | null = null;

  public config: PerfectScrollbarConfigInterface = {};

  public showSearch = false;

  constructor(private modalService: NgbModal, private router: Router) {
    let storedUser = localStorage.getItem("user");
    this.user = storedUser != null ? JSON.parse(storedUser ?? "") : null;
  }

  logout() {
    localStorage.removeItem("auth-token");
    this.router.navigate(["/auth/login"]);
  }

  showProfile() {
    // this.modalService.open(SidebarComponent)
  }

  // This is for Notifications
  notifications: Object[] = [
    {
      btn: "btn-danger",
      icon: "ti-link",
      title: "Luanch Admin",
      subject: "Just see the my new admin!",
      time: "9:30 AM",
    },
    {
      btn: "btn-success",
      icon: "ti-calendar",
      title: "Event today",
      subject: "Just a reminder that you have event",
      time: "9:10 AM",
    },
    {
      btn: "btn-info",
      icon: "ti-settings",
      title: "Settings",
      subject: "You can customize this template as you want",
      time: "9:08 AM",
    },
    {
      btn: "btn-warning",
      icon: "ti-user",
      title: "Pavan kumar",
      subject: "Just see the my admin!",
      time: "9:00 AM",
    },
  ];

  // This is for Mymessages
  mymessages: Object[] = [
    {
      useravatar: "assets/images/users/user1.jpg",
      status: "online",
      from: "Pavan kumar",
      subject: "Just see the my admin!",
      time: "9:30 AM",
    },
    {
      useravatar: "assets/images/users/user2.jpg",
      status: "busy",
      from: "Sonu Nigam",
      subject: "I have sung a song! See you at",
      time: "9:10 AM",
    },
    {
      useravatar: "assets/images/users/user2.jpg",
      status: "away",
      from: "Arijit Sinh",
      subject: "I am a singer!",
      time: "9:08 AM",
    },
    {
      useravatar: "assets/images/users/user4.jpg",
      status: "offline",
      from: "Pavan kumar",
      subject: "Just see the my admin!",
      time: "9:00 AM",
    },
  ];

  public selectedLanguage: any = {
    language: "English",
    code: "en",
    type: "US",
    icon: "us",
  };

  public languages: any[] = [
    {
      language: "English",
      code: "en",
      type: "US",
      icon: "us",
    },
    {
      language: "Español",
      code: "es",
      icon: "es",
    },
    {
      language: "Français",
      code: "fr",
      icon: "fr",
    },
    {
      language: "German",
      code: "de",
      icon: "de",
    },
  ];

  ngAfterViewInit() {}
}
