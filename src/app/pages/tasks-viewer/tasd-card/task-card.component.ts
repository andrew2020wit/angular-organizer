import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../../services/tasks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {
  @Input() task = new Task();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToEdit() {
    this.router.navigate(['/edit-task', this.task.id]);
  }
}
