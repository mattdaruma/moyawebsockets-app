import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-mfa-setup',
  templateUrl: './mfa-setup.component.html',
  styleUrls: ['./mfa-setup.component.scss']
})
export class MfaSetupComponent {
  totpControl = new FormControl()
  constructor(public auth: AuthService) {
   }
   mfaVerify(){
    this.auth.verifySoftwareToken(this.totpControl.value)
   }
}
