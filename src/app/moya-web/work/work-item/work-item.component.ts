import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkService } from '../work.service';

@Component({
  selector: 'app-work-item',
  templateUrl: './work-item.component.html',
  styleUrls: ['./work-item.component.scss']
})
export class WorkItemComponent {
  myWork: any | null = null
  workItemId: string | null = null
  myWorkItem: any | null = null
  constructor(route: ActivatedRoute, work: WorkService) {
    work.myWork$.subscribe(myWork => {
      this.myWork = myWork
      this.trySetWorkItem()
    })
    route.params.subscribe(params => {
      this.workItemId = params['id']
      this.trySetWorkItem()
    })
  }
  trySetWorkItem() {
    if (this.myWork && this.workItemId) {
      this.myWorkItem = this.myWork.myWorkItems[this.workItemId]
    }
  }
}
