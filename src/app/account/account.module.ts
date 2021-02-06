import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountRoutingModule} from './account-routing.module';
import {IonicModule} from '@ionic/angular';
import {LoginComponent} from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        AccountRoutingModule,
        IonicModule,
        ReactiveFormsModule
    ]
})
export class AccountModule {
}
