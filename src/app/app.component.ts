import { Component } from '@angular/core';
import { TasksService } from './services/tasks/tasks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-organizer';

  errors: string[] = [];

  constructor(private tasksService: TasksService) {}

  export() {
    // this.tasksService.exportStateToJSON();
  }
}
