import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../../services/tasks/tasks.service';
import { PrioritiesService } from '../../../services/priorities/priorities.service';
import { HistoryService } from '../../../services/history/history.service';
import { TimersService } from '../../../services/timers/timers.service';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss'],
})
export class TestPageComponent implements OnInit {
  constructor(
    private prioritiesService: PrioritiesService,
    private historyService: HistoryService,
    private timersService: TimersService,
    private tasksService: TasksService,
  ) {}

  ngOnInit(): void {}

  reSetTestData() {
    this.prioritiesService.reSetTestData();
    this.historyService.reSetTestData();
    this.timersService.reSetTestData();
    this.tasksService.resetColumnsTestData()
    this.tasksService.resetTasksTestData();
    window.location.reload();
  }

  import(event: any) {
    const reader = new FileReader();
    reader.readAsText(event.target.files[0]);

    reader.onload = () => {
      // this.tasksService.importFromJSON(reader.result as string);
    };

    reader.onerror = function () {
      console.error(reader.error);
    };
  }
}
