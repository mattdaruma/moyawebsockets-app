import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatStepperModule } from '@angular/material/stepper'
import { MatIconModule } from '@angular/material/icon'
import { AuthComponent } from '../auth.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MfaRequiredComponent } from './mfa-required/mfa-required.component';
import { MfaSetupComponent } from './mfa-setup/mfa-setup.component';
import { SignInComponent } from './sign-in.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginComponent } from './login/login.component'
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SignInComponent,
    ChangePasswordComponent,
    MfaSetupComponent,
    MfaRequiredComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatStepperModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatCardModule,
    RouterModule.forChild([
      { path: '', component: SignInComponent },
      { path: '**', redirectTo: '' }
    ])
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ]
})
export class SignInModule { }
