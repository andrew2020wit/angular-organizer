import { Component, OnDestroy, OnInit } from '@angular/core';
import { ColumnSetting, Task, TasksService } from '../../services/tasks.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-tasks-viewer',
  templateUrl: './tasks-viewer.component.html',
  styleUrls: ['./tasks-viewer.component.scss'],
})
export class TasksViewerComponent implements OnInit, OnDestroy {
  columnSetting: ColumnSetting[] = [];

  private readonly unsubscribe$ = new Subject<void>();

  constructor(private tasksService: TasksService) {
  }

  ngOnInit(): void {
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
        this.prepareTasks(this.tasksService.getTasks());
      });
  }

  prepareTasks(tasks: Task[]) {
    this.columnSetting = this.tasksService.getColumnSetting();
    console.log(tasks)
    this.columnSetting.forEach(x => x.tasks = []);
    tasks.forEach((task) => {
      let taskAttached = false;
      const taskTags = this.tasksService.getTagArray(task.tags);
      this.columnSetting.forEach((column) => {
        const columnTags = this.tasksService.getTagArray(column.tags);
        let exist = false;
        taskTags.forEach((taskTag) => {
          if (columnTags.indexOf(taskTag) > -1) {
            exist = true;
          }
        });
        if (exist) {
          column.tasks?.push(task);
          taskAttached = true;
        }
      });
      if (!taskAttached){
        this.columnSetting[0].tasks?.push(task);
      }
    });
  }
}
