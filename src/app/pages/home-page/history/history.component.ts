import { Component } from '@angular/core';
import { HistoryService } from '../../../services/history/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {
  constructor(protected historyService: HistoryService) {}

  clearHistory() {
    this.historyService.clearHistory();
  }
}
