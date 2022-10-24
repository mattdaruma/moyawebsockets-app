import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { WorkService } from '../work.service';

@Component({
  selector: 'app-work-group-list',
  templateUrl: './work-group-list.component.html',
  styleUrls: ['./work-group-list.component.scss']
})
export class WorkGroupListComponent {
  workGroupDataSource = new MatTableDataSource<any>([])
  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.workGroupDataSource.sort = sort;
  }
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.workGroupDataSource.paginator = paginator;
  }
  columns: any[] = [{
    columnDef: 'displayName',
    header: 'Title',
    cell: ((workGroup: any)=> `${workGroup.displayName}`)
  },{
    columnDef: 'description',
    header: 'Description',
    cell: ((workGroup: any)=> `${workGroup.description}`)
  }]
  displayedColumns = this.columns.map(c => c.columnDef)
  constructor(public work: WorkService, route: ActivatedRoute) {
    this.work.myWork$.subscribe((myWork: any) => {
      let workGroupsArray: any[] = []
      for(let workGroupId in myWork?.myWorkGroups) {
        workGroupsArray.push(myWork.myWorkGroups[workGroupId])
      }
      workGroupsArray.sort((a, b)=>{
        if(a.priority < b.priority) return a
        if(b.priority < a.priority) return b
        if(a.createdDate > b.createdDate) return a
        return b
      })
      this.workGroupDataSource.data = workGroupsArray
    })
   }
}
