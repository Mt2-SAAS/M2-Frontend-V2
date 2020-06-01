import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,
         RouterStateSnapshot,
         CanActivate,
         CanLoad,
         Router
} from '@angular/router';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuardService implements CanActivate, CanLoad {
    constructor(
        private auth: AuthService,
        private router: Router
    ) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if(!this.auth.isAuthenticated){
            this.router.navigate(['/']);
        }
        return this.auth.isAuthenticated();
    }

    canLoad() {
        return this.auth.isAuthenticated();
    }
}
