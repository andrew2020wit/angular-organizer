import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppErrorsService } from './app-errors.service';

const localStorageTaskKey = 'localStorageTaskKey';

export const EmbeddedTaskCategories = {
  Main: 'Main',
  HighPriority: 'HighPriority',
  Postponed: 'Postponed',
  Other: 'Other',
} as const;

export class Task {
  id?: number;
  title = '';
  description?: string;
  timestamp = 0;
  periodTimestamp?: number;
  date?: Date;
  category = 'main';
}

interface ITasksState {
  currentIdCount: number;
  tasks: Task[];
}

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  public tasksIsChanged$ = new BehaviorSubject<boolean>(false);

  private tasksState: ITasksState = {
    currentIdCount: 1,
    tasks: [],
  };

  constructor(private appErrorsService: AppErrorsService) {
    this.loadTasksFromLocalStorage();
    this.tasksIsChanged$.subscribe((tasksIsChanged) => {
      if (!tasksIsChanged) {
        return;
      }
      console.log('tasksIsChanged', this.tasksState);
      this.saveTaskToLocalStorage();
    });
  }

  loadTasksFromLocalStorage() {
    const tasksStateString = localStorage.getItem(localStorageTaskKey);
    if (tasksStateString) {
      const tasksState: ITasksState = JSON.parse(tasksStateString);
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

  public getTaskCategories() {
    const res = [];
    for (let key in EmbeddedTaskCategories) {
      // @ts-ignore
      res.push(EmbeddedTaskCategories[key]);
    }
    console.log('getTaskCategories', res);
    return res;
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
    console.log('getTaskByID', task);
    return task;
  }

  public editTask(task: Task) {
    if (!task.id) {
      task.id = this.tasksState.currentIdCount;
      this.tasksState.currentIdCount++;
    }
    this.insertTask(task);
  }
}
