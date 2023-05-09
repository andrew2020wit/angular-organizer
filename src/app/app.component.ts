import { Component } from '@angular/core';
import { ExportImportService } from './services/export-import/export-import.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-organizer';

  constructor(private exportImportService: ExportImportService) {}

  export() {
    this.exportImportService.exportToJSON();
  }
}
