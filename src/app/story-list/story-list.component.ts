import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators'

  import {  from } from 'rxjs'
import { map, concatMap } from 'rxjs/operators' 

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent implements OnInit {

  subscription: Subscription;
storylist: any;
  resultone: any
  cols:any;

  jsonData:any;
  display:boolean=false

  constructor( private http:HttpClient) { 

  }

  ngOnInit() {

    this.cols = [
      { field: 'title', header: 'Title' },
      { field: 'url', header: 'URL' },
      { field: 'created_at', header: 'Created At' },
      { field: 'author', header: 'Author' }
  ];
    
    this.subscription = timer(0, 10000).pipe(
      switchMap(() => this.http.get('https://hn.algolia.com/api/v1/search_by_date?tags=story'))
    ).subscribe(result => {this.storylist = result
    console.log(this.storylist);
    },
    err=>{
      alert(err.error);
      console.log(err.error);
      
    });

  }
  

  showdata(data){

    this.display=true;
    this.jsonData=JSON.stringify(data)

  }

 
ngOnDestroy() {
  this.resultone.unsubscribe();
}









   

  

 



}



