import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toaster: ToastrService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);

        if (error.error.message) {
          this.toaster.error(error.error.message);
        } else if (error.statusText) {
          this.toaster.error(error.statusText);
        } else {
          this.toaster.error("حدث خطأ ما. تأكد من الاتصال بالإنترنت");
        }

        if (error.status == 401 && error.error == "Unauthorized") {
          localStorage.removeItem("auth-token");
          this.toaster.error("يجب تسجيل الدخول من جديد");
          this.router.navigate(["/auth/login"]);
        }
        throw error;
      })
    );
  }
}

function isJsonString(str: any) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
