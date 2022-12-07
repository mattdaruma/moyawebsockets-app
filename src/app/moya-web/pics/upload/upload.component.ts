import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PicsService } from '../pics.service';

export interface FilesStatus {
  [index: string]: FileStatus
}
export interface FileStatus {
  partsComplete: number
  partsTotal: number
  percentComplete: number
  arrayIndex: number
}
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  private slize=900000
  private simultaneousFiles = 5
  private simultaneousChunks = 10
  _uploadFiles: File[]
  filesStatus: FilesStatus
  totalSize = 0
  set uploadFiles(files: File[]){
    this._uploadFiles = files
    let totalSize = 0
    this.filesStatus = {}
    for(let i in files){
      let file = files[i]
      if(!file.size) continue
      totalSize += file.size
      this.filesStatus[file.name] = {
        partsComplete: 0,
        partsTotal: Math.ceil(file.size / this.slize),
        percentComplete: 0,
        arrayIndex: parseInt(i),
      }
    }
    this.totalSize = totalSize
  }
  get uploadFiles(){
    return this._uploadFiles
  }
  private checkComplete(){
    for(let fileName in this.filesStatus){
      let status = this.filesStatus[fileName]
      if(status.partsComplete < status.partsTotal) return false
    }
    return true
  }
  complete = true
  constructor(private pics: PicsService) {
    this.pics.picUploadReady$.subscribe(msg => {
      this.uploadChunk(this.uploadFiles[this.filesStatus[msg.fileName].arrayIndex])
    })
    this.pics.picUploadPart$.subscribe(msg => {
      this.filesStatus[msg.fileName].partsComplete++
      let complete = this.filesStatus[msg.fileName].partsComplete
      let total = this.filesStatus[msg.fileName].partsTotal
      if(
        msg.index + this.simultaneousChunks < total
        ){
        this.uploadChunk(this.uploadFiles[this.filesStatus[msg.fileName].arrayIndex], msg.index + this.simultaneousChunks)
      }
      this.filesStatus[msg.fileName].percentComplete = Math.floor(
        100*
        complete /
        total
      )
      if(complete === total){
        this.pics.completeUpload(msg.fileName)
      }
    })
    this.pics.picUploadComplete$.subscribe(msg => {
      if(this.filesStatus[msg.fileName].arrayIndex + this.simultaneousFiles < this.uploadFiles.length){
        this.pics.beginUpload(this.uploadFiles[this.filesStatus[msg.fileName].arrayIndex + this.simultaneousFiles].name)
      }else{
        this.complete = this.checkComplete()
      }
    })
   }
  async picUploads(event: any){
    this.complete = false
    this.uploadFiles = event.target.files
    for(let i=0; i<this.simultaneousFiles && i < this.uploadFiles.length; i++){
      this.pics.beginUpload(this.uploadFiles[i].name)
    }
  }
  async uploadChunk(pic: File, index = 0){
    let totalChunks = this.filesStatus[pic.name].partsTotal
    if(index === 0) this.filesStatus[pic.name].percentComplete = 0
    let reader = new FileReader()
    reader.onloadstart = msg => {}
    reader.onload = msg => {}
    reader.onloadend = msg => {
      this.pics.uploadPart(pic.name, index, msg.target?.result as ArrayBuffer)
      if(index < this.simultaneousChunks
        && index + 1 < totalChunks){
        this.uploadChunk(pic, index + 1)
      }
    }
    reader.onerror = msg => console.warn('❌onerror', msg)
    reader.onabort = msg => console.warn('😱onabort', msg)
    reader.onprogress = msg => {}
    let start = index*this.slize
    reader.readAsArrayBuffer(pic.slice(start, start+this.slize))
  }
}
