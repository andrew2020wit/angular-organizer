import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HistoryService } from '../history/history.service';
import { AppTask } from './models/task.model';
import { ColumnSetting } from './models/column-setting.model';
import { ComputedTasks } from './models/computed-tasks.model';
import { computeTestTasks, testColumnsSettings } from './test-data';
import { sortObjectByNumberField } from '../../share/utils/sort-object-by-number-field';
import { tasksLocalStorageKey } from './const/tasks-local-storage-key';
import { columnsLocalStorageKey } from './const/columns-local-storage-key';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly defaultColumnSetting = { title: 'main', tags: [] };
  columnSettings: ColumnSetting[] = [{ ...this.defaultColumnSetting }];
  computedTasks$ = new BehaviorSubject<ComputedTasks[]>([]);

  private tasks: AppTask[] = [];

  constructor(private historyService: HistoryService) {
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
    localStorage.setItem(columnsLocalStorageKey, JSON.stringify(this.columnSettings));
  }

  private loadColumnSettingFromLocalStorage() {
    const str = localStorage.getItem(columnsLocalStorageKey);

    this.columnSettings = !str ? [{ ...this.defaultColumnSetting }] : JSON.parse(str);

    if (!this.columnSettings[0]?.title) {
      this.columnSettings = [{ ...this.defaultColumnSetting }];
    }
  }

  private loadTasksFromLocalStorage() {
    const str = localStorage.getItem(tasksLocalStorageKey);

    this.tasks = !str ? [] : JSON.parse(str);

    if (!this.tasks[0]?.title) {
      this.tasks = [];
    }
  }

  private saveTasks() {
    localStorage.setItem(tasksLocalStorageKey, JSON.stringify(this.tasks));
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
    return this.tasks.find((item) => item.id === id);
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
    localStorage.setItem(tasksLocalStorageKey, JSON.stringify(computeTestTasks()));
  }
}
