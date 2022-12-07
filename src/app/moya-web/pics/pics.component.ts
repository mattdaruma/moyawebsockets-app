import { Component, OnInit } from '@angular/core';
import { PicsService } from './pics.service';

@Component({
  selector: 'app-pics',
  templateUrl: './pics.component.html',
  styleUrls: ['./pics.component.scss']
})
export class PicsComponent implements OnInit {

  constructor(private pics: PicsService) { }

  ngOnInit(): void {
  }

}
