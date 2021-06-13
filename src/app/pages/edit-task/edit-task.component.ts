import { Component, OnInit } from '@angular/core';
import { ITask, TasksService } from '../../services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppErrorsService } from '../../services/app-errors.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  task: ITask = {
    id: 0,
    title: '',
    description: '',
    category: '',
    timestamp: 0,
  };

  selectedDate = new Date();

  categories: string[] = [];

  noDateCheckbox = false;

  constructor(
    private taskService: TasksService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private appErrorService: AppErrorsService,
  ) {
    const snapshotId = activateRoute.snapshot.params['id'];
    if (snapshotId) {
      this.task.id = +snapshotId;
      const task = this.taskService.getTaskByID(+snapshotId);
      if (!task) {
        this.appErrorService.newError('EditTaskComponent: cannot get task');
      } else {
        this.task = task;
      }
    }
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categories = this.taskService.getTaskCategories();
    if (!this.categories.length) {
      return;
    }
    this.task.category = this.categories[0];
  }

  itIsReady() {
    return !!this.task.title;
  }

  editTask() {
    if (this.noDateCheckbox) {
      this.task.timestamp = 0;
    } else {
      this.task.timestamp = this.selectedDate.getTime();
    }
    this.taskService.editTask(this.task);
    this.router.navigate(['']);
  }
  deleteTask() {
    this.taskService.deleteTask(this.task);
    this.router.navigate(['']);
  }
}
