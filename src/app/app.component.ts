import { Component } from '@angular/core';
import { TasksService } from './services/tasks.service';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-organizer';

  errors: string[] = [];

  constructor(
    private tasksService: TasksService,
    private localStorageService: LocalStorageService,
  ) {
    this.localStorageService.load();
  }

  export() {
    this.tasksService.exportStateToJSON();
  }
}
