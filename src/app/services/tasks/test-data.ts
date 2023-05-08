import { ColumnSetting } from './models/column-setting.model';
import { AppTask } from './models/task.model';

export const testColumnsSettings: ColumnSetting[] = [
  { title: 'main', tags: [] },
  { title: 'column12', tags: ['tag1', 'tag2'] },
  { title: 'column34', tags: ['tag3', 'tag4'] },
  { title: 'column23', tags: ['tag2', 'tag3'] },
];

export function computeTestTasks(): AppTask[] {
  let currentTimeStamp = Date.now();

  currentTimeStamp -= 3600 * 24 * 5 * 1000;

  const tasks: AppTask[] = [];

  for (let i = 0; i < 20; i++) {
    const newTask = new AppTask();
    newTask.id = i + 100;
    newTask.title = `task N${i} - tag1`;
    newTask.tags = ['tag1'];
    newTask.highPriority = false;
    newTask.timestamp = currentTimeStamp;
    tasks.push(newTask);

    const newTask2 = new AppTask();
    newTask2.id = i + 200;
    newTask2.title = `task N${i}`;
    newTask2.tags = [];
    newTask2.highPriority = false;
    newTask2.timestamp = currentTimeStamp;
    tasks.push(newTask2);

    const newTask3 = new AppTask();
    newTask3.id = i + 300;
    newTask3.title = `task N${i} - tag3`;
    newTask3.tags = ['tag3'];
    newTask3.highPriority = false;
    newTask3.timestamp = currentTimeStamp;
    tasks.push(newTask3);

    const newTask4 = new AppTask();
    newTask4.id = i + 400;
    newTask4.title = `task N${i} - tag7`;
    newTask4.tags = ['tag7'];
    newTask4.highPriority = false;
    newTask4.timestamp = currentTimeStamp;
    tasks.push(newTask4);

    const newTask5 = new AppTask();
    newTask5.id = i + 500;
    newTask5.title = `task N${i} - tag2`;
    newTask5.tags = ['tag2'];
    newTask5.highPriority = true;
    newTask5.timestamp = currentTimeStamp;
    tasks.push(newTask5);

    currentTimeStamp += 3600 * 24 * 1000;
  }
  return tasks;
}
