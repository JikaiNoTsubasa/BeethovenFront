import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest, HttpStatusCode } from "@angular/common/http";
import { catchError, map, Observable, tap, throwError } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { inject } from "@angular/core";

export function provideAuthInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    if (sessionStorage.getItem('authUser') === null) {
        return next(req);
    }
    const auth = sessionStorage.getItem('authUser');
    if (auth) {
        req = req.clone({
            setHeaders: {
                "Authorization": "Bearer " + auth
            }
        });
    }
    return next(req);
    /*
    return next(req).pipe(tap((event: HttpEvent<any>) => {
        let authService = inject(AuthService);
        if (event.type === HttpEventType.Response) {
            if (event.status === HttpStatusCode.Unauthorized) {
                authService.logout();
            }
        }
    }));
    */
    
    // Logout when retourning error 401
    /*
    return next(req).pipe(
        map((event: HttpEvent<any>) => {
          return event;
        }),
        catchError(
          (
            httpErrorResponse: HttpErrorResponse,
            _: Observable<HttpEvent<any>>
          ) => {
            if (httpErrorResponse.status === HttpStatusCode.Unauthorized) {
              authService.logout();
            }
            return throwError(httpErrorResponse);
          }
        )
      );
      */
}