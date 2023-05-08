import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../../services/tasks/tasks.service';
import { ColumnSetting } from '../../../services/tasks/models/column-setting.model';

@Component({
  selector: 'app-column-setting',
  templateUrl: './column-setting.component.html',
  styleUrls: ['./column-setting.component.scss'],
})
export class ColumnSettingComponent implements OnInit {
  columnSettings: ColumnSetting[] = [];

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.setColumnSetting();
  }

  addNewColumn() {
    this.columnSettings.push({ title: '', tagsString: '', tags: [] });
  }

  removeColumn(index: number) {
    this.columnSettings.splice(index, 1);
  }

  saveSettings() {
    this.columnSettings.forEach(cs => cs.tags = cs.tagsString?.split(/\s/) || []);

    this.tasksService.saveColumnSetting(this.columnSettings);
  }

  private setColumnSetting() {
    const cs = this.tasksService.getColumnSetting();

    cs.forEach((item) => (item.tagsString = item.tags.join(' ')));

    this.columnSettings = cs;
  }
}
