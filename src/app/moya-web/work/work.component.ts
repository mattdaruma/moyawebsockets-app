import { Component, OnInit } from '@angular/core';
import { WorkService } from './work.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {

  constructor(work: WorkService) { }

  ngOnInit(): void {
  }

}
