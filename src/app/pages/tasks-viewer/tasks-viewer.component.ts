import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task, TasksService } from '../../services/tasks.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-tasks-viewer',
  templateUrl: './tasks-viewer.component.html',
  styleUrls: ['./tasks-viewer.component.scss'],
})
export class TasksViewerComponent implements OnInit, OnDestroy {
  preparedTasks: any = {};

  private readonly unsubscribe$ = new Subject<void>();

  constructor(private tasksService: TasksService) {}

  categories: string[] = [];

  ngOnInit(): void {
    this.tasksIsChangedSubscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private tasksIsChangedSubscribe() {
    this.tasksService.tasksIsChanged$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((tasksIsChanged) => {
        if (!tasksIsChanged) {
          return;
        }
        this.prepareTasks(this.tasksService.getTaskArray());
      });
  }



  prepareTasks(tasks: Task[]) {
  }
}
