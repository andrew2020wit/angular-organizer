import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksViewerComponent } from './pages/tasks-viewer/tasks-viewer.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';

const routes: Routes = [
  { path: 'settings', component: SettingsComponent },
  { path: 'edit-task/:id', component: EditTaskComponent },
  { path: 'edit-task', component: EditTaskComponent },
  { path: '', component: TasksViewerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
