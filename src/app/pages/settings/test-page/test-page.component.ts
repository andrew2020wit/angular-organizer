import { Component } from '@angular/core';
import { TasksService } from '../../../services/tasks/tasks.service';
import { PrioritiesService } from '../../../services/priorities/priorities.service';
import { HistoryService } from '../../../services/history/history.service';
import { TimersService } from '../../../services/timers/timers.service';
import { ExportImportService } from '../../../services/export-import/export-import.service';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss'],
})
export class TestPageComponent {
  constructor(
    private prioritiesService: PrioritiesService,
    private historyService: HistoryService,
    private timersService: TimersService,
    private tasksService: TasksService,
    private exportImportService: ExportImportService,
  ) {}

  reSetTestData() {
    this.prioritiesService.reSetTestData();
    this.historyService.reSetTestData();
    this.timersService.reSetTestData();
    this.tasksService.resetColumnsTestData();
    this.tasksService.resetTasksTestData();
    window.location.reload();
  }

  import(event: any) {
    const reader = new FileReader();
    reader.readAsText(event.target.files[0]);

    reader.onload = () => {
      this.exportImportService.importFromJSON(reader.result as string);
    };

    reader.onerror = function () {
      console.error(reader.error);
    };
  }
}
