import { Component, OnInit } from '@angular/core';
import { TimerItem } from '../../services/timers/timer-item.model';
import { TimersService } from '../../services/timers/timers.service';
import { MatDialog } from '@angular/material/dialog';
import { EditTimerDialogComponent } from './edit-timer-dialog/edit-timer-dialog.component';

@Component({
  selector: 'app-timers',
  templateUrl: './timers.component.html',
  styleUrls: ['./timers.component.scss'],
})
export class TimersComponent implements OnInit {
  timers: TimerItem[] = [];

  constructor(protected timersService: TimersService, public timerDialog: MatDialog) {}

  ngOnInit(): void {
    this.timers = this.timersService.get();
  }

  addTimer() {
    this.timerDialog
      .open(EditTimerDialogComponent, {
        data: null,
      })
      .afterClosed()
      .subscribe((result) => {
        console.log('The dialog was closed', result);
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
        console.log('The dialog was closed', result);
        this.timersService.update(result);
      });
  }

  switchTimer(timer: TimerItem) {}

  delete(timer: TimerItem) {
    this.timersService.delete(timer.id);
  }

  getMinutes(seconds: number) {
    return Math.floor(seconds / 60);
  }
}
