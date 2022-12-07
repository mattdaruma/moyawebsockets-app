import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PicsComponent } from './pics.component';
import { RouterModule } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { ViewComponent } from './view/view.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UploadComponent } from './upload/upload.component'
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxFilesizeModule } from 'ngx-filesize';
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    PicsComponent,
    GalleryComponent,
    ViewComponent,
    UploadComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    NgxFilesizeModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    RouterModule.forChild([
      {path: '', component: PicsComponent, children: [
        {path: '', pathMatch: 'full', redirectTo: 'gallery'},
        {path: 'gallery', component: GalleryComponent},
        {path: 'view', component: ViewComponent},
        {path: 'upload', component: UploadComponent},
        {path: '**', redirectTo: 'gallery'}
      ]}
    ])
  ]
})
export class PicsModule { }
