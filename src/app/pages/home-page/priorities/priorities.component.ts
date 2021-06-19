import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {TasksService} from "../../../services/tasks.service";

@Component({
  selector: 'app-priorities',
  templateUrl: './priorities.component.html',
  styleUrls: ['./priorities.component.scss']
})
export class PrioritiesComponent implements OnInit {

  priorities: string[]
  newPriority = '';

  constructor(private tasksService: TasksService) {
    this.priorities = this.tasksService.getPriorities();
  }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.priorities, event.previousIndex, event.currentIndex);
    this.tasksService.setPriorities(this.priorities);
  }

  addPriority(){
    this.priorities.unshift(this.newPriority);
    this.tasksService.setPriorities(this.priorities);
    this.newPriority = '';
  }

  deletePriority(index: number){
    this.priorities.splice(index, 1);
    this.tasksService.setPriorities(this.priorities);
  }

}
