import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppTask } from '../../../../services/tasks/task.model';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {
  @Input() task = new AppTask();

  delta = 0;
  taskDate = new Date();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.delta = (this.task.timestamp - Date.now()) / (3600 * 1000 * 24);
    this.taskDate = new Date(this.task.timestamp);
  }

  goToEdit() {
    this.router.navigate(['/edit-task', this.task.id]);
  }
}
