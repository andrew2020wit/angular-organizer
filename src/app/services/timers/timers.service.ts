import { Injectable } from '@angular/core';
import { TimerItem } from './timer-item.model';

@Injectable({
  providedIn: 'root',
})
export class TimersService {
  private timers: TimerItem[] = [];

  private readonly localStorageTimersKey = 'localStorageTimersKey';

  constructor() {
    this.loadTimersFromLocalStorage();
    this.runTimers();
  }

  runTimers() {

  }

  public save() {
    localStorage.setItem(this.localStorageTimersKey, JSON.stringify(this.timers));
  }

  get() {
    return this.timers;
  }

  private loadTimersFromLocalStorage() {
    const localStorageTimersString = localStorage.getItem(this.localStorageTimersKey);

  }
}
