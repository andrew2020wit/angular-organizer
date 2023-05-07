import { Component } from '@angular/core';
import { AppErrorsService } from './services/app-errors.service';
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
    private errorService: AppErrorsService,
    private tasksService: TasksService,
    private localStorageService: LocalStorageService,
  ) {
    this.localStorageService.load();

    this.errorService.appErrors$.subscribe((errors) => {
      this.errors = errors;
    });
  }

  clearErrors() {
    this.errorService.clearErrors();
  }

  export() {
    this.tasksService.exportStateToJSON();
  }
}
