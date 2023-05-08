import { Component, OnInit } from '@angular/core';
import { ColumnSetting, TasksService } from '../../../services/tasks/tasks.service';

@Component({
  selector: 'app-column-setting',
  templateUrl: './column-setting.component.html',
  styleUrls: ['./column-setting.component.scss'],
})
export class ColumnSettingComponent implements OnInit {
  columnSettings: ColumnSetting[];

  constructor(private tasksService: TasksService) {
    this.columnSettings = this.tasksService.getColumnSetting();
  }

  ngOnInit(): void {}

  addNewColumn() {
    this.columnSettings.push({ title: '', tags: '' });
  }

  removeColumn(index: number) {
    this.columnSettings.splice(index, 1);
  }

  saveSettings() {
    this.tasksService.saveColumnSetting(this.columnSettings);
  }
}
