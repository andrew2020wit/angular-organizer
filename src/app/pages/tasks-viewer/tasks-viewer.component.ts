import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmbeddedTaskCategories, ITask, TasksService } from '../../services/tasks.service';
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
        this.getCategories();
        this.prepareTasks(this.tasksService.getTaskArray());
      });
  }

  getCategories() {
    this.categories = this.tasksService.getTaskCategories();
  }

  prepareTasks(tasks: ITask[]) {
    this.categories.forEach((category) => {
      this.preparedTasks[category] = [];
    });

    tasks.forEach((task) => {
      if (-1 === this.categories.indexOf(task.category)) {
        task.category = EmbeddedTaskCategories.Other;
      }
      this.preparedTasks[task.category].push(task);
    });
    this.categories.forEach((category) => {
      this.preparedTasks[category].sort((a: ITask, b: ITask) => {
        return a.timestamp - b.timestamp;
      });
    });
  }
}
