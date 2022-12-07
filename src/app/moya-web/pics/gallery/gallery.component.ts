import { Component, OnInit } from '@angular/core';
import { PicsService } from '../pics.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  constructor(private pics: PicsService) { }

  ngOnInit(): void {
  }

}
