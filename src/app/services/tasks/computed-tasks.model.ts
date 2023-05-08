import { AppTask } from './task.model';

export interface ComputedTasks {
  columnTitle: string;
  tasks: AppTask[];
  tags: string[];
}
