import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { WorkService } from '../work.service';

@Component({
  selector: 'app-work-queue',
  templateUrl: './work-queue.component.html',
  styleUrls: ['./work-queue.component.scss']
})
export class WorkQueueComponent {
  queueDataSource = new MatTableDataSource<any>([])
  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.queueDataSource.sort = sort;
  }
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.queueDataSource.paginator = paginator;
  }
  columns: any[] = [{
    columnDef: 'displayName',
    header: 'Title',
    cell: ((workItem: any)=> `${workItem.displayName}`)
  },{
    columnDef: 'group',
    header: 'Top Group',
    cell: ((workItem: any)=> `${workItem.group.displayName}`)
  }]
  displayedColumns = this.columns.map(c => c.columnDef)
  constructor(public work: WorkService, route: ActivatedRoute) {
    this.work.myWork$.subscribe((myWork: any) => {
      let workItemsArray: any[] = []
      for(let workItemId in myWork?.myWorkItems) {
        myWork.myWorkItems[workItemId].groupPriority = 0
        for(let groupId of myWork?.myWorkItems[workItemId].workGroupIds){
          if(myWork.myWorkGroups[groupId].priority > myWork.myWorkItems[workItemId].groupPriority){
            myWork.myWorkItems[workItemId].groupPriority = myWork.myWorkGroups[groupId].priority
            myWork.myWorkItems[workItemId].group = myWork.myWorkGroups[groupId]
          }
        }
        workItemsArray.push(myWork?.myWorkItems[workItemId])
      }
      workItemsArray.sort((a, b)=>{
        if(a.groupPriority < b.groupPriority) return a
        if(b.groupPriority < a.groupPriority) return b
        if(a.itemPriority < b.itemPriority) return a
        if(b.itemPriority < a.itemPriority) return b
        if(a.createdDate < b.createdDate) return a
        return b
      })
      this.queueDataSource.data = workItemsArray
    })
   }
}
