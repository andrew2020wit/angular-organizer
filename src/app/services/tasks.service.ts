import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {AppErrorsService} from "./app-errors.service";

const localStorageTaskKey = 'localStorageTaskKey';

const EmbeddedTaskCategories = {
  Main:  'Main',
  HighPriority:  'HighPriority',
  Postponed:  'Postponed',
  Other:  'Other'
} as const;

export interface ITask {
  id?: number;
  title: string;
  description?: string;
  timestamp: number;
  periodTimestamp?: number;
  data?: Date;
  category?: string;
}

interface ITasksState {
  currentIdCount: number;
  tasks: ITask[];
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
    return res;
  }

  sortArrayOfTasks(tasks: ITask[]): ITask[] {
    if (!tasks) {
      return [];
    }
    tasks.sort((a, b) => {
      return a.timestamp - b.timestamp;
    });
    return tasks;
  }

  public getTaskArray() {
    return this.tasksState.tasks;
  }

  private insertTask(task: ITask) {
    const index = this.tasksState.tasks.findIndex((item) => {
     return  item.id === task.id;
    });
    if (index === -1) {
      this.tasksState.tasks.push(task)
    } else {
      this.tasksState.tasks.splice(index, 1, task)
    }
  }

  deleteTask(task: ITask) {
    const index = this.tasksState.tasks.findIndex((item) => {
      return  item.id === task.id;
    });
    if (index === -1) {
      this.appErrorsService.newError('TasksService: task was not fined');
      console.error('TasksService: task was not fined', task);
    } else {
      this.tasksState.tasks.splice(index, 1)
    }
  }

  getTaskByID(id: number){
    const task = this.tasksState.tasks.find((item => {
      return item.id === id;
    }))
    return task
  }

  public editTask(task: ITask) {
    if (!task.id) {
      task.id = this.tasksState.currentIdCount;
      this.tasksState.currentIdCount++;
    }
    this.insertTask(task);
    this.tasksIsChanged$.next(true);
  }
}
