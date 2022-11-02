import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { WorkService } from '../work.service';

@Component({
  selector: 'app-work-search',
  templateUrl: './work-search.component.html',
  styleUrls: ['./work-search.component.scss']
})
export class WorkSearchComponent  {
  searchDataSource = new MatTableDataSource<any>([])
  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.searchDataSource.sort = sort;
  }
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.searchDataSource.paginator = paginator;
  }
  columns: any[] = [{
    columnDef: 'title',
    header: 'Title',
    cell: ((workItem: any)=> `${workItem.title}`)
  },{
    columnDef: 'description',
    header: 'Description',
    cell: ((workItem: any)=> `${workItem.description}`)
  }]
  displayedColumns = this.columns.map(c => c.columnDef)
  constructor(public work: WorkService, route: ActivatedRoute) {
    this.work.myWork$.subscribe((myWork: any) => {
      let workItemsArray: any[] = []
      for(let workItemId in myWork?.myWorkItems) {
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
      this.searchDataSource.data = workItemsArray
    })
   }
}
