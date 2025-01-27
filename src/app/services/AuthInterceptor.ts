import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { ResponseLogin } from "../models/database/dto/ResponseLogin";

export function provideAuthInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    const authUser = JSON.parse(sessionStorage.getItem('authUser') ?? '{}') as ResponseLogin;
    if (authUser.user.id) {
        req = req.clone({
            setHeaders: {
                "userId": authUser.user.id.toString()
            }
        });
    }
    
    return next(req);
}