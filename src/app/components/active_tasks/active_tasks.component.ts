import { Component } from '@angular/core';
import { CouchService } from '../../services/couch.service';

@Component({
    selector: 'active-tasks',
    templateUrl: './active_tasks.component.html'
})

export class ActiveTasks {
   
    _active_tasks;
  
    constructor(private couch: CouchService) {
       this.GetActiveTasks()
    }


    GetActiveTasks(){
      
        this.couch.get('_active_tasks', (result) => { this._active_tasks = result })
        
    }
}