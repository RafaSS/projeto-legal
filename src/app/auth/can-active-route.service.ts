import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {AccountService} from '../account/account.service';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class CanActiveRouteService implements CanActivate {

    constructor(private accountService: AccountService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let hasAccess = false;
        const authorities: string[] = route.data.authorities;
        hasAccess = this.accountService.hasAnyAuthorities(authorities);
        if (!hasAccess) {
            this.router.navigate(['/account/login']);
        }
        return hasAccess;
    }
}
