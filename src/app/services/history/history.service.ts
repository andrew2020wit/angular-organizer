import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HistoryRecord } from './history.model';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  history$ = new BehaviorSubject<HistoryRecord[]>([]);

  private history: HistoryRecord[] = [];
  private readonly historyKey = 'history';

  constructor() {}

  loadHistoryFromLocalStorage() {
    const str = localStorage.getItem(this.historyKey);

    this.history = !str ? [] : JSON.parse(str);

    if (!this.history[0]?.message) {
      this.history = [];
    }

    this.setHistory(this.history);
  }

  clearHistory() {
    this.setHistory([]);
  }

  addHistory(record: HistoryRecord) {
    this.setHistory([...this.history, record]);
  }

  private setHistory(history: HistoryRecord[]) {
    this.history = history;
    localStorage.setItem(this.historyKey, JSON.stringify(this.history));
    this.history$.next(history);
  }
}
