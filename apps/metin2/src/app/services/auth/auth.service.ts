import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
// Servicio
import { HttpService } from '../http/http.service';
import { JwtHelperService } from '@auth0/angular-jwt';

// Interfaces
import { User } from '../../interfaces/';

// Store
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { DeleteToken, DeleteUser } from '../../store/actions';

const helper = new JwtHelperService();

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(
        private http: HttpService,
        private store: Store<AppState>
    ) {}

    login(UserData: User) {
        return this.http.login(UserData)
            .pipe(
                map((res: any) => {
                    return {
                        token: res.refresh
                    };
                })
            );
    }

    logout() {
        localStorage.removeItem('token');
        this.store.dispatch(DeleteToken());
        this.store.dispatch(DeleteUser());
    }

    isAuthenticated() {
       const token = localStorage.getItem('token');
       const isExpired = helper.isTokenExpired(token);
       return !isExpired;
    }

}
