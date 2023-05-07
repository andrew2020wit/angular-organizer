import { Injectable } from '@angular/core';
import { TimerItem } from './timer-item.model';

@Injectable({
  providedIn: 'root'
})
export class TimersService {

  private timers: TimerItem[] = [];

  private readonly localStorageTimersKey = 'localStorageTimersKey';

  constructor() {
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

  private saveTimersToLocalStorage() {
    localStorage.setItem(this.localStorageTimersKey, JSON.stringify(this.timers));
  }

  public saveTimers() {
    this.saveTimersToLocalStorage();
  }

  getTimers() {
    return this.timers;
  }

  private loadTimersFromLocalStorage() {
    const localStorageTimersString = localStorage.getItem(this.localStorageTimersKey);
    if (localStorageTimersString) {
      this.timers = JSON.parse(localStorageTimersString);
      this.timers.forEach((timer) => {
        timer.restOfSecond = timer.countOfMinute * 60;
        timer.isDone = false;
        timer.isRun = false;
      });
    }
  }
}
