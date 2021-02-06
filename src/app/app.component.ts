import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {MenuController} from '@ionic/angular';
import {Router} from '@angular/router';
import {AuthServiceService} from './auth/auth-service.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private menu: MenuController,
        private router: Router,
        private authService: AuthServiceService
    ) {
        this.initializeApp();
    }

    initializeApp(): void {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    openFirst(): void {
        this.menu.enable(true, 'first');
        this.menu.open('first');
    }

    logout(): void {
        this.authService.logout().subscribe({complete: () => this.router.navigate(['/account/login'])});
    }
}
