import { Component, OnInit } from '@angular/core';
import { ITask, TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  task: ITask = {
    title: '',
    description: '',
    category: '',
    timestamp: 0,
  };

  selectedDate = new Date();

  categories: string[] = [];

  noDateCheckbox = false;

  constructor(private taskService: TasksService) {}

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

  addTask() {
    if (this.noDateCheckbox) {
      this.task.timestamp = 0;
    } else {
      this.task.timestamp = this.selectedDate.getTime();
    }
    this.taskService.editTask(this.task);
  }
}
