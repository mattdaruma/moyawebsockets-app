import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })
  constructor(private fb: FormBuilder, public auth: AuthService) {
  }
  disabled: boolean = false;
  async signMeIn(){
    if(!this.loginForm.valid) return
    let email = this.loginForm.get('email')?.value ?? ''
    let password = this.loginForm.get('password')?.value ?? ''
    this.auth.signIn(email, password)
  }
}
