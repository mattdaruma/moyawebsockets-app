import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-mfa-required',
  templateUrl: './mfa-required.component.html',
  styleUrls: ['./mfa-required.component.scss']
})
export class MfaRequiredComponent {
  totpRequiredControl = new FormControl('', [Validators.required])
  constructor(public auth: AuthService) { 
    this.auth.totpRequired$.subscribe(value => {
    })
  }
  mfaRequired(){
    if(!this.totpRequiredControl.valid) return
    this.auth.sendMFACode(this.totpRequiredControl.value!)
  }
}
