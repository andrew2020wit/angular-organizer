import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppErrorsService } from './app-errors.service';

const localStorageTaskKey = 'localStorageTaskKey';

export class Task {
  id = 0;
  title = '';
  description = '';
  timestamp = 0;
  periodTimestamp = 0;
  date?: Date;
  tags = '';
  highPriority = false;
}

export class ColumnSetting {
  title = '';
  tags = '';
}

class TasksState {
  currentIdCount = 1;
  tasks: Task[] = [];
  columnSetting: ColumnSetting[] = [{ title: 'main', tags: '' }];
  history: Task[] = [];
  priorities: string[] = [];
}

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  public tasksIsChanged$ = new BehaviorSubject<boolean>(false);

  private tasksState = new TasksState();

  constructor(private appErrorsService: AppErrorsService) {
    this.loadTasksFromLocalStorage();
    this.tasksIsChanged$.subscribe((tasksIsChanged) => {
      if (!tasksIsChanged) {
        return;
      }
      this.saveTaskToLocalStorage();
    });
  }

  loadTasksFromLocalStorage() {
    const tasksStateString = localStorage.getItem(localStorageTaskKey);
    if (tasksStateString) {
      const tasksState: TasksState = JSON.parse(tasksStateString);
      if (!tasksState.currentIdCount || !tasksState.tasks.length) {
        return;
      }
      this.tasksState.currentIdCount = tasksState.currentIdCount;
      this.tasksState.tasks = tasksState.tasks;
      this.tasksIsChanged$.next(true);
    }
  }

  private saveTaskToLocalStorage() {
    localStorage.setItem(localStorageTaskKey, JSON.stringify(this.tasksState));
  }

  public getTaskArray() {
    return this.tasksState.tasks;
  }

  private insertTask(task: Task) {
    const index = this.tasksState.tasks.findIndex((item) => {
      return item.id === task.id;
    });
    if (index === -1) {
      this.tasksState.tasks.push(task);
      this.tasksIsChanged$.next(true);
    } else {
      this.tasksState.tasks.splice(index, 1, task);
      this.tasksIsChanged$.next(true);
    }
  }

  deleteTask(task: Task) {
    const index = this.tasksState.tasks.findIndex((item) => {
      return item.id === task.id;
    });
    if (index === -1) {
      this.appErrorsService.newError('TasksService: task was not fined');
      console.error('TasksService: task was not fined', task);
    } else {
      this.tasksState.tasks.splice(index, 1);
      this.tasksIsChanged$.next(true);
    }
  }

  getTaskByID(id: number) {
    const task = this.tasksState.tasks.find((item) => {
      return item.id === id;
    });
    return task;
  }

  public editTask(task: Task) {
    if (!task.id) {
      task.id = this.tasksState.currentIdCount;
      this.tasksState.currentIdCount++;
    }
    this.insertTask(task);
  }

  getColumnSetting() {
    return [...this.tasksState.columnSetting];
  }
}
