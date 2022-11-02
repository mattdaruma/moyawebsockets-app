import { DatePipe } from '@angular/common';
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
    columnDef: 'title',
    header: 'Title',
    cell: ((workItem: any)=> `${workItem.title}`)
  },{
    columnDef: 'groupPriority',
    header: 'Group Priority',
    cell: (()=> ``)
  },{
    columnDef: 'priority',
    header: 'Priority',
    cell: ((workItem: any)=> `${workItem.priority}`)
  },{
    columnDef: 'createdBy',
    header: 'Created By',
    cell: ((workItem: any)=> `${workItem.createdByUserId}`)
  },{
    columnDef: 'createdDate',
    header: 'Created Date',
    cell: ((workItem: any)=> `${this.datePipe.transform(workItem.createdDateUTC, 'yyyy-MM-dd hh:mm')}`)
  }]
  displayedColumns = this.columns.map(c => c.columnDef)
  constructor(public work: WorkService, route: ActivatedRoute, private datePipe: DatePipe) {
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
      this.queueDataSource.data = workItemsArray
    })
   }
}
