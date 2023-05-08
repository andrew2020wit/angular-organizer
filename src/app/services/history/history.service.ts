import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HistoryRecord } from './history.model';
import { historyTestData } from './test-data';
import { historyLocalStorageKey } from './history-local-storage-key';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  history$ = new BehaviorSubject<HistoryRecord[]>([]);

  private history: HistoryRecord[] = [];

  constructor() {
    this.loadHistoryFromLocalStorage();
  }

  clearHistory() {
    this.setHistory([]);
  }

  addHistory(record: HistoryRecord) {
    this.setHistory([...this.history, record]);
  }

  reSetTestData() {
    this.setHistory(historyTestData);
  }

  private loadHistoryFromLocalStorage() {
    const str = localStorage.getItem(historyLocalStorageKey);

    this.history = !str ? [] : JSON.parse(str);

    if (!this.history[0]?.message) {
      this.history = [];
    }

    this.setHistory(this.history);
  }

  private setHistory(history: HistoryRecord[]) {
    this.history = history;
    localStorage.setItem(historyLocalStorageKey, JSON.stringify(this.history));
    this.history$.next(history);
  }
}
