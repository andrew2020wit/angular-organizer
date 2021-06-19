import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TasksService } from '../../../services/tasks.service';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss'],
})
export class TestPageComponent implements OnInit {
  constructor(private router: Router, private tasksService: TasksService) {}

  ngOnInit(): void {}

  deleteAll() {
    this.tasksService.deleteAll();
  }

  reInit() {
    this.tasksService.testInitDate();
  }

  import(event: any) {
    const reader = new FileReader();
    reader.readAsText(event.target.files[0]);

    reader.onload = () => {
      this.tasksService.importFromJSON(reader.result as string);
    };

    reader.onerror = function () {
      console.error(reader.error);
    };
  }
}
