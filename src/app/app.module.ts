import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TasksViewerComponent } from './pages/home-page/tasks-viewer/tasks-viewer.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import { TaskCardComponent } from './pages/home-page/tasks-viewer/tasd-card/task-card.component';
import {MatCardModule} from "@angular/material/card";
import { ColumnSettingComponent } from './pages/settings/column-setting/column-setting.component';
import {MatTabsModule} from "@angular/material/tabs";
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PrioritiesComponent } from './pages/home-page/priorities/priorities.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatIconModule} from "@angular/material/icon";

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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
