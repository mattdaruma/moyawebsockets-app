import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkComponent } from './work.component';
import { RouterModule } from '@angular/router';
import { WorkSearchComponent } from './work-search/work-search.component';
import { WorkItemComponent } from './work-item/work-item.component';
import { WorkGroupComponent } from './work-group/work-group.component';
import { WorkQueueComponent } from './work-queue/work-queue.component';
import { WorkGroupListComponent } from './work-group-list/work-group-list.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    WorkComponent,
    WorkSearchComponent,
    WorkItemComponent,
    WorkGroupComponent,
    WorkQueueComponent,
    WorkGroupListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    RouterModule.forChild([
      {path: '', component:WorkComponent, children: [
        {path: '', pathMatch: 'full', redirectTo: 'queue'},
        {path: 'search', component: WorkSearchComponent},
        {path: 'queue', component: WorkQueueComponent},
        {path: 'groups', component: WorkGroupListComponent},
        {path: 'group/:id', component: WorkGroupComponent},
        {path: 'item/:id', component: WorkItemComponent},
        {path: '**', redirectTo: 'queue'}
      ]}
    ])
  ]
})
export class WorkModule { }
