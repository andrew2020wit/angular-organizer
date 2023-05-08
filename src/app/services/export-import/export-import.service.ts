import { Injectable } from '@angular/core';
import { JsonExport } from './json-export.model';
import { historyLocalStorageKey } from '../history/history-local-storage-key';
import { priorityLocalStorageKey } from '../priorities/priority-local-storage-key';
import { columnsLocalStorageKey } from '../tasks/const/columns-local-storage-key';
import { tasksLocalStorageKey } from '../tasks/const/tasks-local-storage-key';
import { timersLocalStorageKey } from '../timers/timers-local-storage-key';

@Injectable({
  providedIn: 'root',
})
export class ExportImportService {
  constructor() {}

  exportToJSON() {
    const history = localStorage.getItem(historyLocalStorageKey) || JSON.stringify([]);
    const priority = localStorage.getItem(priorityLocalStorageKey) || JSON.stringify([]);
    const columns = localStorage.getItem(columnsLocalStorageKey) || JSON.stringify([]);
    const tasks = localStorage.getItem(tasksLocalStorageKey) || JSON.stringify([]);
    const timers = localStorage.getItem(timersLocalStorageKey) || JSON.stringify([]);

    const data: JsonExport = {
      history: JSON.parse(history),
      priority: JSON.parse(priority),
      columns: JSON.parse(columns),
      tasks: JSON.parse(tasks),
      timers: JSON.parse(timers),
    };

    ExportImportService.download(JSON.stringify(data), 'organizer-export.json', 'text/plain');
  }

  static download(content: string, fileName: string, contentType: string) {
    const a = document.createElement('a');
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  importFromJSON(json: string) {
    const state: JsonExport = JSON.parse(json);

    const history = JSON.stringify(state.history || []);
    const priority = JSON.stringify(state.priority || []);
    const columns = JSON.stringify(state.columns || []);
    const tasks = JSON.stringify(state.tasks || []);
    const timers = JSON.stringify(state.timers || []);

    localStorage.setItem(historyLocalStorageKey, history);
    localStorage.setItem(priorityLocalStorageKey, priority);
    localStorage.setItem(columnsLocalStorageKey, columns);
    localStorage.setItem(tasksLocalStorageKey, tasks);
    localStorage.setItem(timersLocalStorageKey, timers);

    window.location.reload();
  }
}
