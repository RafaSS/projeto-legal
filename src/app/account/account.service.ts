import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Account} from '../models/account.model';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    private url: string = environment.SERVER_API_URL;

    constructor(
        private http: HttpClient,
        private sessionStorageService: SessionStorageService,
        private localStorageService: LocalStorageService) {
    }

    getAccount(): Observable<Account> {
        return this.http.get<Account>(`${this.url}api/account`).pipe(tap((account: Account) => {
            this.sessionStorageService.store('account', account);
        }));
    }

    hasAnyAuthorities(authorities: string | string[]): boolean {
        let hasAuthority = false;
        const account: Account = this.sessionStorageService.retrieve('account');
        if (account) {
            if (!Array.isArray(authorities)) {
                authorities = [authorities];
            }
            hasAuthority = authorities?.some((authority: string) => account?.authorities?.includes(authority));
        }
        return hasAuthority;
    }
}
