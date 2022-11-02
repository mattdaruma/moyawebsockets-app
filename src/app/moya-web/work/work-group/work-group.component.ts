import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkService } from '../work.service';

@Component({
  selector: 'app-work-group',
  templateUrl: './work-group.component.html',
  styleUrls: ['./work-group.component.scss']
})
export class WorkGroupComponent {
  myWork: any | null = null
  workGroupId: string | null = null
  myWorkGroup: any | null = null
  constructor(route: ActivatedRoute, work: WorkService) {
    work.myWork$.subscribe(myWork => {
      this.myWork = myWork
      this.trySetWorkGroup()
    })
    route.params.subscribe(params => {
      this.workGroupId = params['id']
      this.trySetWorkGroup()
    })
  }
  trySetWorkGroup() {
    if (this.myWork && this.workGroupId) {
      this.myWorkGroup = this.myWork.myWorkGroups[this.workGroupId]
    }
  }
}
