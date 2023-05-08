import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppTask } from '../../services/tasks/task.model';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  task = new AppTask();

  selectedDate = new Date();
  nextDate = new Date();

  constructor(
    private taskService: TasksService,
    private router: Router,
    private activateRoute: ActivatedRoute,
  ) {
    this.getCurrentTask();
  }

  ngOnInit(): void {}

  getCurrentTask() {
    const snapshotId = this.activateRoute.snapshot.params['id'];

    if (snapshotId) {
      this.task.id = +snapshotId;
      const task = this.taskService.getTaskByID(+snapshotId);
      this.task = Object.assign({}, task);
      this.selectedDate = new Date(this.task.timestamp);
      this.nextDate = new Date(this.task.timestamp + this.task.periodTimestamp);
    }
  }

  itIsReady() {
    return !!this.task.title;
  }

  editTask() {
    this.task.timestamp = this.selectedDate.getTime();
    this.taskService.editTask(this.task);
    this.router.navigate(['']);
  }

  deleteTask() {
    this.taskService.deleteTask(this.task);
    this.router.navigate(['']);
  }

  setPeriodTimestamp() {
    this.task.periodTimestamp = this.nextDate.getTime() - this.task.timestamp;
    if (this.task.periodTimestamp < 0) {
      this.task.periodTimestamp = 0;
    }
  }

  nextRound() {
    if (!this.task.periodTimestamp) {
      return;
    }
    this.task.timestamp += this.task.periodTimestamp;
    this.taskService.editTask(this.task);
    this.router.navigate(['']);
  }
}
