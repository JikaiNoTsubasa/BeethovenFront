import { HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, throwError } from "rxjs";
import { AuthService } from "./auth.service";

export function provideBearerInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    let auth = inject(AuthService);
    let router = inject(Router);
    let bearer = sessionStorage.getItem('token');
    //console.log(bearer);
    if (bearer) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${bearer}`
            }
        });
    }
    //console.log(req);
    return next(req).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            auth.logout();
            router.navigate(['/login']);
          }
          return throwError(() => err);
        })
      );
}