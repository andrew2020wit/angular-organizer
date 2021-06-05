import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface ITask {
  id?: number;
  title: string;
  description?: string;
  timestamp: number;
  category?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  public tasksIsChanged$ = new BehaviorSubject<boolean>(false);
  private taskCategories: string[] = ['main', 'postponed'];
  public tasks: Record<number, ITask> = {};
  private currentIdCount = 1;

  constructor() {}

  public getTaskCategories() {
    return this.taskCategories;
  }

  public getTaskArray(): ITask[] {
    const res: ITask[] = [];
    if (!this.tasks) {
      return []
    }
    for (let key in this.tasks) {
      res.push(this.tasks[key]);
    }
    return res
  }

  public editTask(task: ITask) {
    if (!task.id) {
      task.id = this.currentIdCount;
      this.currentIdCount++;
    }
    this.tasks[task.id] = task;
    this.tasksIsChanged$.next(true)
  }
}
