import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,
         RouterStateSnapshot,
         CanActivate,
         CanLoad,
         Router
} from '@angular/router';
import { AuthService } from './auth.service';

// Redux
import { AppState } from '@store';
import { Store } from '@ngrx/store';
import { HiddenProfileModal } from '@store/actions';

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad {
    constructor(
        private auth: AuthService,
        private router: Router,
        private store: Store<AppState>
    ) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        // Verify is users are auth
        /*
            this application only have two routes and it's necesary this interval for check
            is user session is valid.
        */
        if (state.url.includes('/modal/')) {

            const interval = setInterval(() => {
                if(!this.auth.isAuthenticated()){
                    clearInterval(interval);
                    this.auth.logout();
                    this.store.dispatch(HiddenProfileModal({hidden: true}));
                    this.router.navigate(['/']);
                }
            }, 1000);

        }

        return this.auth.isAuthenticated();
    }

    canLoad() {
        return this.auth.isAuthenticated();
    }
}
