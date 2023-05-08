import { Injectable } from '@angular/core';
import { TimerItem } from './timer-item.model';
import { sortObjectByNumberField } from '../../share/utils/sort-object-by-number-field';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimersService {
  timers$ = new BehaviorSubject<TimerItem[]>([]);

  private timers: TimerItem[] = [];

  private readonly localStorageTimersKey = 'localStorageTimersKey';

  constructor() {
    this.loadTimersFromLocalStorage();
  }

  switch(timer: TimerItem) {
    if (!timer.endTimeStamp || timer.endTimeStamp < Date.now()) {
      this.startTimer(timer);
    } else {
      this.stopTimer(timer);
    }
  }

  private startTimer(timer: TimerItem) {
    this.update({ ...timer, endTimeStamp: Date.now() + timer.minutes * 60000 });
  }

  private stopTimer(timer: TimerItem) {
    this.update({ ...timer, endTimeStamp: undefined });
  }

  add(newTimer: TimerItem) {
    this.timers.push(newTimer);
    this.timers.sort(sortObjectByNumberField('order'));
    this.setTimers();
  }

  delete(id: number) {
    this.timers = this.timers.filter((timer) => timer.id !== id);
    this.setTimers();
  }

  update(newTimer: TimerItem) {
    const oldTimer = this.timers.find((timer) => timer.id === newTimer.id);
    this.timers = this.timers.filter((timer) => timer.id !== newTimer.id);
    this.timers.push({ ...oldTimer, ...newTimer });
    this.timers.sort(sortObjectByNumberField('order'));
    this.setTimers();
  }

  get() {
    return this.timers;
  }

  private setTimers(save = true) {
    this.timers$.next(this.timers);

    if (save) {
      this.save();
    }
  }

  private save() {
    localStorage.setItem(this.localStorageTimersKey, JSON.stringify(this.timers));
  }

  private loadTimersFromLocalStorage() {
    const str = localStorage.getItem(this.localStorageTimersKey);

    this.timers = !str ? [] : JSON.parse(str);

    if (!this.timers[0]?.label) {
      this.timers = [];
    }

    this.setTimers(false);
  }
}
