import { RouteInfo } from "./sidebar.metadata";

export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard/books/list",
    title: "Dashboard",
    icon: "bi bi-speedometer2",
    class: "",
    extralink: false,
    submenu: [],
  },
  {
    path: "/dashboard/categories/list",
    title: "Categories",
    icon: "bi bi-menu-app",
    class: "",
    extralink: false,
    submenu: [],
  },

  {
    path: "/about",
    title: "About",
    icon: "bi bi-people",
    class: "",
    extralink: false,
    submenu: [],
  },
];
