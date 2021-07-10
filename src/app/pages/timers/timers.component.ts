import { Component, OnDestroy, OnInit } from '@angular/core';
import { TasksService, TimerItem } from '../../services/tasks.service';

@Component({
  selector: 'app-timers',
  templateUrl: './timers.component.html',
  styleUrls: ['./timers.component.scss'],
})
export class TimersComponent implements OnInit {
  timers: TimerItem[] = [];

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.timers = this.tasksService.getTimers();
  }

  addTimer() {
    this.timers.push(new TimerItem());
  }
  saveTimers() {
    this.tasksService.saveTimers();
  }
  startStopTimer(timer: TimerItem) {
    if (timer.isRun) {
      timer.restOfSecond = timer.countOfMinute * 60;
    }
    timer.isRun = !timer.isRun;
    timer.isDone = false;
  }

  deleteTimer(index: number) {
    this.timers.splice(index, 1);
  }

  getMinute(seconds: number) {
    return Math.floor(seconds / 60);
  }
}
