import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HistoryService } from '../history/history.service';
import { AppTask } from './task.model';
import { ColumnSetting } from './column-setting.model';
import { ComputedTasks } from './computed-tasks.model';
import { computeTestTasks, testColumnsSettings } from './test-data';
import { sortObjectByNumberField } from '../../share/utils/sort-object-by-number-field';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  // public tasksStateIsChanged$ = new BehaviorSubject<boolean>(false);
  private readonly defaultColumnSetting = { title: 'main', tags: [] };
  columnSettings: ColumnSetting[] = [{ ...this.defaultColumnSetting }];

  private tasks: AppTask[] = [];

  computedTasks$ = new BehaviorSubject<ComputedTasks[]>([]);

  private readonly localStorageTaskKey = 'localStorageTaskStateKey';
  private readonly localStorageColumnsKey = 'localStorageColumnsKey';

  constructor(
    private historyService: HistoryService,
    private router: Router,
    private datePipe: DatePipe,
  ) {
    this.loadColumnSettingFromLocalStorage();
    this.loadTasksFromLocalStorage();
    this.computeTasks(false);
  }

  getColumnSetting() {
    const res: ColumnSetting[] = [];

    this.columnSettings.forEach((columnSetting) => {
      res.push(Object.assign({}, columnSetting));
    });

    return res;
  }

  saveColumnSetting(columnSetting: ColumnSetting[]) {
    this.columnSettings = columnSetting;
    localStorage.setItem(this.localStorageColumnsKey, JSON.stringify(this.columnSettings));
  }

  private loadColumnSettingFromLocalStorage() {
    const str = localStorage.getItem(this.localStorageColumnsKey);

    this.columnSettings = !str ? [{ ...this.defaultColumnSetting }] : JSON.parse(str);

    if (!this.columnSettings[0]?.title) {
      this.columnSettings = [{ ...this.defaultColumnSetting }];
    }
  }

  private loadTasksFromLocalStorage() {
    const str = localStorage.getItem(this.localStorageTaskKey);

    this.tasks = !str ? [] : JSON.parse(str);

    if (!this.tasks[0]?.title) {
      this.tasks = [];
    }
  }

  private saveTasks() {
    localStorage.setItem(this.localStorageTaskKey, JSON.stringify(this.tasks));
  }

  computeTasks(save = true) {
    const computedTasksColumns: ComputedTasks[] = [];
    let allColumnTags: string[] = [];

    this.columnSettings.forEach((cs) => {
      computedTasksColumns.push({
        columnTitle: cs.title,
        tags: cs.tags,
        tasks: [],
      });
      allColumnTags = [...allColumnTags, ...cs.tags];
    });

    this.tasks.forEach((task) => {
      let isMatchedAll = false;
      const mainColumn = computedTasksColumns.find((column) => !column.tags.length);

      if (!mainColumn) {
        console.error('mainColumn is undefined');

        return;
      }

      computedTasksColumns.forEach((column) => {
        let isMatched = false;

        task.tags.forEach((taskTag) => {
          if (column.tags.includes(taskTag)) {
            isMatched = true;
            isMatchedAll = true;
          }
        });

        if (isMatched) {
          column.tasks.push(task);
        }
      });

      if (!isMatchedAll) {
        mainColumn.tasks.push(task);
      }
    });

    computedTasksColumns.forEach((column) => {
      column.tasks.sort(sortObjectByNumberField('timestamp'));
    });

    this.computedTasks$.next(computedTasksColumns);

    if (save) {
      this.saveTasks();
    }
  }

  // public getTasks() {
  //   const tasks = [...this.tasks];
  //   tasks.sort((a, b) => {
  //     return a.timestamp - b.timestamp;
  //   });
  //   return tasks;
  // }

  private insertTask(task: AppTask) {
    const index = this.tasks.findIndex((item) => item.id === task.id);

    if (index === -1) {
      this.tasks.push(task);
      this.computeTasks();
    } else {
      this.tasks.splice(index, 1, task);
      this.computeTasks();
    }
  }

  deleteTask(task: AppTask) {
    const index = this.tasks.findIndex((item) => {
      return item.id === task.id;
    });

    this.tasks.splice(index, 1);
    this.computeTasks();

    this.historyService.addHistory({
      date: new Date(),
      message: `Task "${task.title}" has deleted`,
    });
  }

  getTaskByID(id: number) {
    const task = this.tasks.find((item) => {
      return item.id === id;
    });
    return task;
  }

  public editTask(task: AppTask) {
    if (!task.id) {
      task.id = Date.now();
    }
    this.insertTask(task);
  }

  resetColumnsTestData() {
    this.saveColumnSetting(testColumnsSettings);
  }

  resetTasksTestData() {
    localStorage.setItem(this.localStorageTaskKey, JSON.stringify(computeTestTasks()));
  }

  static download(content: string, fileName: string, contentType: string) {
    const a = document.createElement('a');
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  // exportStateToJSON() {
  //   const exportObj: ExportImportObject = {
  //     version: 2,
  //     tasks: this.tasksState,
  //   };
  //   const jsonData = JSON.stringify(exportObj);
  //   const dateString = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
  //   const fileName = 'tasks-state-' + dateString + '.json';
  //   TasksService.download(jsonData, fileName, 'text/plain');
  // }
  //
  // importFromJSON(json: string) {
  //   if (!json) {
  //     return;
  //   }
  //   const exportImportObject: ExportImportObject = JSON.parse(json);
  //   if (exportImportObject.version !== 2) {
  //     if (confirm('exportImportObject.version !== 2, abort?')) {
  //       return;
  //     }
  //   }
  //   this.tasksState = exportImportObject.tasks;
  //   this.saveTaskStateToLocalStorage();
  //   location.assign('');
  // }
}
