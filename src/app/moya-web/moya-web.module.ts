import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoyaWebComponent } from './moya-web.component';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs'; 
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider'; 
import {MatListModule} from '@angular/material/list'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    MoyaWebComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatCardModule,
    RouterModule.forChild([
      {path: '', component:MoyaWebComponent, children: [
      ]}
    ])
  ]
})
export class MoyaWebModule { }
