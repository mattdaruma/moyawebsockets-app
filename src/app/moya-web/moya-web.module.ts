import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoyaWebComponent } from './moya-web.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu'; 

@NgModule({
  declarations: [
    MoyaWebComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
    RouterModule.forChild([
      {path: '', component:MoyaWebComponent, children: [
        {path: '', pathMatch: 'full', redirectTo: 'chat'},
        {path: 'work', loadChildren: () => import('./work/work.module').then(m => m.WorkModule)},
        {path: 'chat', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)},
        {path: '**', redirectTo: 'chat'}
      ]}
    ])
  ]
})
export class MoyaWebModule { }
