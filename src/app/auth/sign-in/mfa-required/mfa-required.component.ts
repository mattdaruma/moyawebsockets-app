import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-mfa-required',
  templateUrl: './mfa-required.component.html',
  styleUrls: ['./mfa-required.component.scss']
})
export class MfaRequiredComponent {
  totpRequiredControl = new FormControl('')
  constructor(public auth: AuthService) { 
    this.auth.totpRequired$.subscribe(value => {
    })
  }
  mfaRequired(){
    this.auth.sendMFACode(this.totpRequiredControl.value!)
  }
}
