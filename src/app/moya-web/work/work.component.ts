import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WorkService } from './work.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {
  myWorkGroupsArray$ = new BehaviorSubject<any | null>(null)
  constructor(public work: WorkService) { 
    work.myWork$.subscribe(myWork => {
      let workGroups = []
      for(let workGroupId in myWork?.myWorkGroups ?? []){
        workGroups.push(myWork?.myWorkGroups[workGroupId])
      }
      workGroups.sort((a, b)=>{
        var aName = a.title.toLowerCase();
        var bName = b.title.toLowerCase();
        return aName<bName ?-1:aName> bName? 1 :0;
      })
      this.myWorkGroupsArray$.next(workGroups)
    })
  }

  ngOnInit(): void {
  }

}
