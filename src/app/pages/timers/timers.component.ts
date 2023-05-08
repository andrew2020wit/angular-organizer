import { Component, OnDestroy, OnInit } from '@angular/core';
import { TimerItem } from '../../services/timers/timer-item.model';
import { TimersService } from '../../services/timers/timers.service';
import { MatDialog } from '@angular/material/dialog';
import { EditTimerDialogComponent } from './edit-timer-dialog/edit-timer-dialog.component';

@Component({
  selector: 'app-timers',
  templateUrl: './timers.component.html',
  styleUrls: ['./timers.component.scss'],
})
export class TimersComponent implements OnInit, OnDestroy {
  timers: TimerItem[] = [];

  // it's triggers change detection
  interval = setInterval(() => {}, 1000);

  Date = Date;

  constructor(protected timersService: TimersService, public timerDialog: MatDialog) {}

  ngOnInit(): void {
    this.timers = this.timersService.get();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  addTimer() {
    this.timerDialog
      .open(EditTimerDialogComponent, {
        data: null,
      })
      .afterClosed()
      .subscribe((result) => {
        this.timersService.add(result);
      });
  }

  updateTimer(timer: TimerItem) {
    this.timerDialog
      .open(EditTimerDialogComponent, {
        data: timer,
      })
      .afterClosed()
      .subscribe((result) => {
        this.timersService.update(result);
      });
  }

  switchTimer(timer: TimerItem) {
    this.timersService.switch(timer);
  }

  delete(timer: TimerItem) {
    this.timersService.delete(timer.id);
  }

  getMinutes(timer: TimerItem) {
    if (!timer.endTimeStamp) {
      return;
    }

    return Math.floor((timer.endTimeStamp - Date.now()) / 1000 / 60);
  }

  getSeconds(timer: TimerItem) {
    if (!timer.endTimeStamp) {
      return;
    }

    return Math.floor(((timer.endTimeStamp - Date.now()) / 1000) % 60);
  }
}
