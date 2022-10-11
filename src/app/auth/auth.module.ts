import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './sign-in/change-password/change-password.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SignInModule } from './sign-in/sign-in.module';
import { AuthComponent } from './auth.component';


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatToolbarModule,
    RouterModule.forChild([
        { path: '', component: AuthComponent, children: [
          {path: '', pathMatch: 'full', redirectTo: 'sign-in'},
          {path: 'sign-in', loadChildren: () => import('./sign-in/sign-in.module').then(m => m.SignInModule)},
          {path: '**', redirectTo: 'sign-in'}
        ]},
    ])
  ]
})
export class AuthModule { }
