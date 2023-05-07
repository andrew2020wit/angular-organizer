import { Injectable } from '@angular/core';
import { PrioritiesService } from './priorities.service';
import { HistoryService } from './history/history.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(
    private prioritiesService: PrioritiesService,
    private historyService: HistoryService,
  ) {}

  load() {
    this.prioritiesService.loadPrioritiesFromLocalStorage();
    this.historyService.loadHistoryFromLocalStorage();
  }
}
