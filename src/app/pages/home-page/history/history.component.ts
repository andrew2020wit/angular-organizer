import { Component, OnDestroy } from '@angular/core';
import { HistoryRecord, TasksService } from '../../../services/tasks.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnDestroy {
  historyRecords: HistoryRecord[] = [];

  private readonly unsubscribe$ = new Subject<void>();

  constructor(private tasksService: TasksService) {
    this.tasksIsChangedSubscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private tasksIsChangedSubscribe() {
    this.tasksService.tasksStateIsChanged$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((tasksIsChanged) => {
        if (!tasksIsChanged) {
          return;
        }
        this.historyRecords = this.tasksService.getHistory();
      });
  }

  clearHistory() {
    this.tasksService.clearHistory();
  }
}
