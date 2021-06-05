import { Component, OnDestroy, OnInit } from '@angular/core';
import { ITask, TasksService } from '../../services/tasks.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-tasks-viewer',
  templateUrl: './tasks-viewer.component.html',
  styleUrls: ['./tasks-viewer.component.scss'],
})
export class TasksViewerComponent implements OnInit, OnDestroy {
  tasks: ITask[] = [];
  private readonly unsubscribe$ = new Subject<void>();
  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasksService.tasksIsChanged$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((tasksIsChanged) => {
        if (!tasksIsChanged) {
          return;
        }
        this.tasks = this.tasksService.getTaskArray();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
