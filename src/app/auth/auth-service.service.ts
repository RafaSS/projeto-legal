import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {JwtToken} from '../models/JwtToken.model';
import {Login} from '../models/login.model';
import {Account} from '../models/account.model';
import {AccountService} from '../account/account.service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Injectable({
    providedIn: 'root'
})
export class AuthServiceService {
    user$?: Observable<Account>;

    constructor(
        private http: HttpClient,
        private sessionStorageService: SessionStorageService,
        private localStorageService: LocalStorageService,
        private accountService: AccountService) {
    }

    getToken(): Promise<string> {
        return this.sessionStorageService.retrieve('authenticationToken');
    }

    login(credentials: Login): Observable<void> {
        return this.http
            .post<JwtToken>(`${environment.SERVER_API_URL}api/authenticate`, credentials)
            .pipe(map(response => this.authenticateSuccess(response, credentials.rememberMe)));
    }

    loginF(credentials: Login): Observable<Account> {
        return this.login(credentials).pipe(mergeMap(() => {
                return this.accountService.getAccount();
            }
        ));
    }

    logout(): Observable<void> {
        return new Observable(observer => {
            this.sessionStorageService.clear('authenticationToken');
            this.sessionStorageService.clear('account');
            observer.complete();
        });
    }

    private authenticateSuccess(response: JwtToken, rememberMe: boolean): void {
        const jwt = response.id_token;
        this.sessionStorageService.store('authenticationToken', jwt);
    }
}
