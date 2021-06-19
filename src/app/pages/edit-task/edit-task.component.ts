import { Component, OnInit } from '@angular/core';
import { Task, TasksService } from '../../services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppErrorsService } from '../../services/app-errors.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  task = new Task();

  selectedDate = new Date();
  nextDate = new Date();

  constructor(
    private taskService: TasksService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private appErrorService: AppErrorsService,
  ) {
    this.getCurrentTask();
  }

  ngOnInit(): void {}

  getCurrentTask() {
    const snapshotId = this.activateRoute.snapshot.params['id'];
    if (snapshotId) {
      this.task.id = +snapshotId;
      const task = this.taskService.getTaskByID(+snapshotId);
      if (!task) {
        this.appErrorService.newError('EditTaskComponent: cannot get task');
      } else {
        this.task = Object.assign({}, task);
      }
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
}
