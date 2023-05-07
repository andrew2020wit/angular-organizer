import { Component, OnInit } from '@angular/core';
import { TimerItem } from '../../services/timers/timer-item.model';
import { TimersService } from '../../services/timers/timers.service';

@Component({
  selector: 'app-timers',
  templateUrl: './timers.component.html',
  styleUrls: ['./timers.component.scss'],
})
export class TimersComponent implements OnInit {
  timers: TimerItem[] = [];

  constructor(private timersService: TimersService) {}

  ngOnInit(): void {
    this.timers = this.timersService.getTimers();
  }

  addTimer() {
    this.timers.push(new TimerItem());
  }

  saveTimers() {
    this.timersService.saveTimers();
  }

  switchTimer(timer: TimerItem) {
    if (timer.isRun) {
      timer.restOfSecond = timer.countOfMinute * 60;
    }
    timer.isRun = !timer.isRun;
    timer.isDone = false;
  }

  deleteTimer(index: number) {
    this.timers.splice(index, 1);
  }

  getMinutes(seconds: number) {
    return Math.floor(seconds / 60);
  }
}
