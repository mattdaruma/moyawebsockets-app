import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  changePasswordForm = this.fb.group({
    'nickname': [],
    'email': [],
    'oldPassword': [],
    'newPassword': [],
    'confirmNewPassword': []
  })
  constructor(private fb: FormBuilder, public auth: AuthService) {
    this.auth.newPasswordRequired$.subscribe(val => {
      let emailControl = this.changePasswordForm.get('email') as FormControl
      emailControl.setValue(val.userAttributes.email)
      emailControl.disable()
    })
   }
  changePassword(){
    let formValues = this.changePasswordForm.value
    this.auth.completeNewPasswordChallenge(formValues.newPassword ?? '', formValues.nickname ?? '')
  }
}
