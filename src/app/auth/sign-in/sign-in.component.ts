import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignInComponent  {
  selectedIndex$ = new BehaviorSubject<number>(0)
  loginSuccess$ = new BehaviorSubject<boolean>(false)
  newPasswordSuccess$ = new BehaviorSubject<boolean>(false)
  mfaRequiredSuccess$ = new BehaviorSubject<boolean>(false)
  mfaSetupSuccess$ = new BehaviorSubject<boolean>(false)
  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) { 
    this.auth.newPasswordRequired$.subscribe(val => {
      this.loginSuccess$.next(true)
      this.selectedIndex$.next(1)
    })
    this.auth.mfaSetup$.subscribe(val => {
      this.loginSuccess$.next(true)
      this.selectedIndex$.next(2)
    })
    this.auth.totpRequired$.subscribe(val => {
      this.loginSuccess$.next(true)
      this.selectedIndex$.next(3)
    })
    this.auth.onSuccess$.subscribe(()=>{
      this.loginSuccess$.next(true)
      this.selectedIndex$.next(4)
    })
    this.auth.authenticated$.subscribe(authed => {
      if(authed){
        this.loginSuccess$.next(true)
        this.selectedIndex$.next(4)
        this.router.navigate(['/'])
      }
    })
  }
}
