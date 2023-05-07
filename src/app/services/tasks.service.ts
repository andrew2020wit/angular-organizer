import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppErrorsService } from './app-errors.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HistoryService } from './history/history.service';

const localStorageTaskKey = 'localStorageTaskStateKey';
const localStorageTimersKey = 'localStorageTimersKey';

interface ExportImportObject {
  version: number;
  tasks: TasksState;
  timers: TimerItem[];
}

export class Task {
  id = 0;
  title = '';
  description = '';
  timestamp = Date.now();
  periodTimestamp = 0;
  tags = '';
  highPriority = false;
}

export class TimerItem {
  label = '';
  countOfMinute = 0;
  isRun = false;
  isDone = false;
  restOfSecond = 0;
}

export class ColumnSetting {
  title = '';
  tags = '';
  tasks?: Task[];
}

class TasksState {
  stateVersion = 1;
  currentIdCount = 1;
  tasks: Task[] = [];
  columnSettings: ColumnSetting[] = [{ title: 'main', tags: '' }];
}

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  public tasksStateIsChanged$ = new BehaviorSubject<boolean>(false);

  private tasksState = new TasksState();
  private timers: TimerItem[] = [];

  constructor(
    private appErrorsService: AppErrorsService,
    private historyService: HistoryService,
    private router: Router,
    private datePipe: DatePipe,
  ) {
    this.loadTasksFromLocalStorage();
    this.tasksStateIsChanged$.subscribe((tasksIsChanged) => {
      if (!tasksIsChanged) {
        return;
      }
      this.saveTaskStateToLocalStorage();
    });
    this.loadTimersFromLocalStorage();
    this.runTimers();
  }

  runTimers() {
    setInterval(() => {
      this.timers.forEach((timer) => {
        if (timer.restOfSecond < 1) {
          timer.restOfSecond = timer.countOfMinute * 60;
          if (timer.isRun) {
            timer.isRun = false;
            timer.isDone = true;
          }
        }
        if (!timer.isRun) {
          return;
        }
        timer.restOfSecond -= 1;
      });
    }, 1000);
  }

  private loadTimersFromLocalStorage() {
    const localStorageTimersString = localStorage.getItem(localStorageTimersKey);
    if (localStorageTimersString) {
      this.timers = JSON.parse(localStorageTimersString);
      this.timers.forEach((timer) => {
        timer.restOfSecond = timer.countOfMinute * 60;
        timer.isDone = false;
        timer.isRun = false;
      });
    }
  }

  private saveTimersToLocalStorage() {
    localStorage.setItem(localStorageTimersKey, JSON.stringify(this.timers));
  }

  public saveTimers() {
    this.saveTimersToLocalStorage();
  }

  private loadTasksFromLocalStorage() {
    const tasksStateString = localStorage.getItem(localStorageTaskKey);
    if (tasksStateString) {
      const tasksState: TasksState = JSON.parse(tasksStateString);
      this.tasksState = tasksState;
      this.tasksStateIsChanged$.next(true);
    } else {
      if (confirm('LocalStorage is empty. Do you want to init test data?')) {
        this.testInitDate();
      }
    }
  }

  getTimers() {
    return this.timers;
  }

  private saveTaskStateToLocalStorage() {
    localStorage.setItem(localStorageTaskKey, JSON.stringify(this.tasksState));
  }

  public getTasks() {
    const tasks = [...this.tasksState.tasks];
    tasks.sort((a, b) => {
      return a.timestamp - b.timestamp;
    });
    return tasks;
  }

  private insertTask(task: Task) {
    const index = this.tasksState.tasks.findIndex((item) => {
      return item.id === task.id;
    });
    if (index === -1) {
      this.tasksState.tasks.push(task);
      this.tasksStateIsChanged$.next(true);
    } else {
      this.tasksState.tasks.splice(index, 1, task);
      this.tasksStateIsChanged$.next(true);
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
      this.tasksStateIsChanged$.next(true);
      this.historyService.addHistory({
        date: new Date(),
        message: `Task "${task.title}" has deleted`,
      });
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
    const res: ColumnSetting[] = [];
    this.tasksState.columnSettings.forEach((columnSetting) => {
      res.push(Object.assign({}, columnSetting));
    });
    return res;
  }

  saveColumnSetting(columnSetting: ColumnSetting[]) {
    this.tasksState.columnSettings = columnSetting;
    this.tasksStateIsChanged$.next(true);
  }

  getTagArray(tagsString: string): string[] {
    tagsString.replace(/\s/g, ' ');
    return tagsString.split(' ');
  }

  deleteAll() {
    localStorage.clear();
    location.assign('');
  }

  testInitDate() {
    const newState = new TasksState();
    newState.columnSettings = [
      { title: 'main', tags: '' },
      { title: 'column2', tags: 'tag1 tag2' },
      { title: 'column3', tags: 'tag3 tag4' },
    ];

    const tasks = newState.tasks;

    newState.currentIdCount = 10000;

    let currentTimeStamp = Date.now();

    currentTimeStamp -= 3600 * 24 * 5 * 1000;

    for (let i = 0; i < 20; i++) {
      const newTask = new Task();
      newTask.id = i + 100;
      newTask.title = `task N${i} - tag1`;
      newTask.tags = 'tag1';
      newTask.highPriority = false;
      newTask.timestamp = currentTimeStamp;
      tasks.push(newTask);

      const newTask2 = new Task();
      newTask2.id = i + 200;
      newTask2.title = `task N${i}`;
      newTask2.tags = '';
      newTask2.highPriority = false;
      newTask2.timestamp = currentTimeStamp;
      tasks.push(newTask2);

      const newTask3 = new Task();
      newTask3.id = i + 300;
      newTask3.title = `task N${i} - tag3`;
      newTask3.tags = 'tag3';
      newTask3.highPriority = false;
      newTask3.timestamp = currentTimeStamp;
      tasks.push(newTask3);

      const newTask4 = new Task();
      newTask4.id = i + 400;
      newTask4.title = `task N${i} - tag7`;
      newTask4.tags = 'tag7';
      newTask4.highPriority = false;
      newTask4.timestamp = currentTimeStamp;
      tasks.push(newTask4);

      const newTask5 = new Task();
      newTask5.id = i + 500;
      newTask5.title = `task N${i} - tag2`;
      newTask5.tags = 'tag2';
      newTask5.highPriority = true;
      newTask5.timestamp = currentTimeStamp;
      tasks.push(newTask5);

      currentTimeStamp += 3600 * 24 * 1000;
    }
    this.tasksState = newState;
    this.saveTaskStateToLocalStorage();
    location.assign('');
  }

  static download(content: string, fileName: string, contentType: string) {
    const a = document.createElement('a');
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  exportStateToJSON() {
    const exportObj: ExportImportObject = {
      version: 2,
      tasks: this.tasksState,
      timers: this.timers,
    };
    const jsonData = JSON.stringify(exportObj);
    const dateString = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
    const fileName = 'tasks-state-' + dateString + '.json';
    TasksService.download(jsonData, fileName, 'text/plain');
  }

  importFromJSON(json: string) {
    if (!json) {
      return;
    }
    const exportImportObject: ExportImportObject = JSON.parse(json);
    if (exportImportObject.version !== 2) {
      if (confirm('exportImportObject.version !== 2, abort?')) {
        return;
      }
    }
    this.tasksState = exportImportObject.tasks;
    this.timers = exportImportObject.timers;
    this.saveTaskStateToLocalStorage();
    this.saveTimersToLocalStorage();
    location.assign('');
  }
}
