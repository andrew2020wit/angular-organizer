import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './pages/settings/settings.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutComponent } from './pages/about/about.component';
import { TimersComponent } from './pages/timers/timers.component';

const routes: Routes = [
  { path: 'settings', component: SettingsComponent },
  { path: 'edit-task/:id', component: EditTaskComponent },
  { path: 'edit-task', component: EditTaskComponent },
  { path: 'timers', component: TimersComponent },
  { path: 'about', component: AboutComponent },
  { path: '', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
