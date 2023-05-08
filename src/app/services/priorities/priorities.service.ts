import { Injectable } from '@angular/core';
import { priorityLocalStorageKey } from './priority-local-storage-key';

@Injectable({
  providedIn: 'root',
})
export class PrioritiesService {
  get priorities() {
    return this._priorities;
  }

  set priorities(x: string[]) {
    this._priorities = x;
    this.savePrioritiesToLocalStorage();
  }

  private _priorities: string[] = [];

  constructor() {
    this.loadPrioritiesFromLocalStorage();
  }

  public reSetTestData() {
    this.priorities = [
      'priority1',
      'priority2',
      'priority3',
      'priority4',
      'priority5',
      'priority6',
    ];
  }

  private loadPrioritiesFromLocalStorage() {
    const str = localStorage.getItem(priorityLocalStorageKey);

    this.priorities = !str ? [] : JSON.parse(str);

    if (!Array.isArray(this.priorities)) {
      this.priorities = [];
    }
  }

  private savePrioritiesToLocalStorage() {
    localStorage.setItem(priorityLocalStorageKey, JSON.stringify(this._priorities));
  }
}
