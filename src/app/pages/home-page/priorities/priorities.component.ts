import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TasksService } from '../../../services/tasks.service';
import { PrioritiesService } from '../../../services/priorities.service';
import { HistoryService } from '../../../services/history/history.service';

@Component({
  selector: 'app-priorities',
  templateUrl: './priorities.component.html',
  styleUrls: ['./priorities.component.scss'],
})
export class PrioritiesComponent implements OnInit {
  protected priorities: string[] = [];
  protected newPriority = '';

  constructor(
    private tasksService: TasksService,
    private historyService: HistoryService,
    private prioritiesService: PrioritiesService,
  ) {}

  ngOnInit() {
    this.priorities = this.prioritiesService.priorities;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.priorities, event.previousIndex, event.currentIndex);
    this.prioritiesService.priorities = this.priorities;
  }

  addPriority() {
    this.priorities.unshift(this.newPriority);
    this.prioritiesService.priorities = this.priorities;
    this.newPriority = '';
  }

  deletePriority(index: number) {
    const title = this.priorities[index];
    this.priorities.splice(index, 1);
    this.prioritiesService.priorities = this.priorities;
    this.historyService.addHistory({ date: new Date(), message: `Priority "${title}" has deleted` });
  }
}
