import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthServiceService} from '../../auth/auth-service.service';
import {FormBuilder, Validators} from '@angular/forms';
import {ToastController} from '@ionic/angular';
import {SessionStorageService} from 'ngx-webstorage';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm = this.fb.group({
        username: [null, [Validators.required]],
        password: [null, [Validators.required]],
        rememberMe: [false],
    });

    async showToast(msg: string, color: string) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000,
            color
        });
        toast.present();
    }

    constructor(
        private router: Router,
        private authService: AuthServiceService,
        private fb: FormBuilder,
        public toastController: ToastController,
        private sessionStorageService: SessionStorageService) {
    }

    ngOnInit() {
        console.log(this.sessionStorageService.retrieve('account'));
        if (this.sessionStorageService.retrieve('account')) {
            this.router.navigate(['/tabs/courses']);
        }
    }

    login(): void {
        if (this.loginForm.valid) {
            this.authService.loginF(
                {
                    username: this.loginForm.get('username').value,
                    password: this.loginForm.get('password').value,
                    rememberMe: this.loginForm.get('rememberMe').value,
                }
            ).subscribe({
                next: () => {
                    this.showToast('Logged in', 'success');
                    this.router.navigate(['/tabs/courses']);
                },
                error: () => (this.showToast('Failure', 'danger'))
            });
        }
    }

}
