import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const localStorageTaskKey = 'localStorageTaskKey';

export interface ITask {
  id?: number;
  title: string;
  description?: string;
  timestamp: number;
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
  private taskCategories: string[] = ['main', 'postponed'];
  public tasks: Record<number, ITask> = {};
  private currentIdCount = 1;

  constructor() {
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
      this.currentIdCount = tasksState.currentIdCount;
      this.tasks = {};
      tasksState.tasks.forEach((task) => {
        if (!task.id) {
          return;
        }
        this.tasks[task.id] = task;
      });
      this.tasksIsChanged$.next(true);
    }
  }

  private saveTaskToLocalStorage() {
    const tasksState: ITasksState = {
      currentIdCount: this.currentIdCount,
      tasks: this.getTaskArray(),
    };
    localStorage.setItem(localStorageTaskKey, JSON.stringify(tasksState));
  }

  public getTaskCategories() {
    return this.taskCategories;
  }

  public getTaskArray(): ITask[] {
    const res: ITask[] = [];
    if (!this.tasks) {
      return [];
    }
    for (let key in this.tasks) {
      if (this.tasks[key].timestamp) {
        this.tasks[key].data = new Date(this.tasks[key].timestamp);
      } else {
        this.tasks[key].data = undefined;
      }
      res.push(this.tasks[key]);
    }
    res.sort((a, b) => {
      return a.timestamp - b.timestamp;
    });
    return res;
  }

  public editTask(task: ITask) {
    if (!task.id) {
      task.id = this.currentIdCount;
      this.currentIdCount++;
    }
    this.tasks[task.id] = task;
    this.tasksIsChanged$.next(true);
  }
}
