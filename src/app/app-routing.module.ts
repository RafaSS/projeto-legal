import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {CanActiveRouteService} from './auth/can-active-route.service';
import {Authority} from './Authority';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
        data: {
            authorities: [Authority.TEACHER]
        },
        canActivate: [CanActiveRouteService]
    },
    {
        path: 'account',
        loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
        data: {
            authorities: [Authority.TEACHER]
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
