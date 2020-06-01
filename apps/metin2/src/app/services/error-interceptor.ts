import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { token_getter } from './token-getter';

import { catchError } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private auth: AuthService,
        private router: Router
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone();
        return next.handle(request).pipe(
            catchError( (error: any) => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 401) {
                        const token = token_getter();
                        if (token) {
                            this.auth.logout();
                            this.router.navigate(['/']);
                        }
                    }
                }
                return throwError(error);
            })
        );
    }
}
