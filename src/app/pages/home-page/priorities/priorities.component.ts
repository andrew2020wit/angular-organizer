import { Component, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TasksService } from '../../../services/tasks.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-priorities',
  templateUrl: './priorities.component.html',
  styleUrls: ['./priorities.component.scss'],
})
export class PrioritiesComponent implements OnDestroy {
  priorities: string[];
  newPriority = '';

  private readonly unsubscribe$ = new Subject<void>();

  constructor(private tasksService: TasksService) {
    this.priorities = this.tasksService.getPriorities();
    this.tasksIsChangedSubscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private tasksIsChangedSubscribe() {
    this.tasksService.tasksStateIsChanged$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((tasksIsChanged) => {
        if (!tasksIsChanged) {
          return;
        }
        this.priorities = this.tasksService.getPriorities();
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.priorities, event.previousIndex, event.currentIndex);
    this.tasksService.setPriorities(this.priorities);
  }

  addPriority() {
    this.priorities.unshift(this.newPriority);
    this.tasksService.setPriorities(this.priorities);
    this.newPriority = '';
  }

  deletePriority(index: number) {
    const title = this.priorities[index];
    this.priorities.splice(index, 1);
    this.tasksService.setPriorities(this.priorities);
    this.tasksService.addHistory({ date: new Date(), message: `Priority "${title}" has deleted` });
  }
}
