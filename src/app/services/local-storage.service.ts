import { Injectable } from '@angular/core';
import { PrioritiesService } from './priorities.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(private prioritiesService: PrioritiesService) {}

  load() {
    this.prioritiesService.loadPrioritiesFromLocalStorage();
  }

}
