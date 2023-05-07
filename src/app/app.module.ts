import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TasksViewerComponent } from './pages/home-page/tasks-viewer/tasks-viewer.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { FormsModule } from '@angular/forms';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatLegacyOptionModule as MatOptionModule } from '@angular/material/legacy-core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TaskCardComponent } from './pages/home-page/tasks-viewer/tasd-card/task-card.component';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { ColumnSettingComponent } from './pages/settings/column-setting/column-setting.component';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PrioritiesComponent } from './pages/home-page/priorities/priorities.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { HistoryComponent } from './pages/home-page/history/history.component';
import { TestPageComponent } from './pages/settings/test-page/test-page.component';
import { DatePipe } from '@angular/common';
import { AboutComponent } from './pages/about/about.component';
import { TimersComponent } from './pages/timers/timers.component';

const local = window.navigator.language;

@NgModule({
  declarations: [
    AppComponent,
    TasksViewerComponent,
    SettingsComponent,
    EditTaskComponent,
    TaskCardComponent,
    ColumnSettingComponent,
    HomePageComponent,
    PrioritiesComponent,
    HistoryComponent,
    TestPageComponent,
    AboutComponent,
    TimersComponent,
  ],
  imports: [
    MatNativeDateModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatTabsModule,
    DragDropModule,
    MatIconModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: local }, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
