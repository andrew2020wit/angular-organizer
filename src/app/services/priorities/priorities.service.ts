import { Injectable } from '@angular/core';

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

  private readonly prioritiesKey = 'priorities';

  constructor() {
    this.loadPrioritiesFromLocalStorage();
  }

  public initTestData() {
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
    const str = localStorage.getItem(this.prioritiesKey);

    this.priorities = !str ? [] : JSON.parse(str);

    if (!Array.isArray(this.priorities)) {
      this.priorities = [];
    }
  }

  private savePrioritiesToLocalStorage() {
    localStorage.setItem(this.prioritiesKey, JSON.stringify(this._priorities));
  }
}
