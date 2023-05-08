export class AppTask {
  id = 0;
  title = '';
  description = '';
  timestamp = Date.now();
  periodTimestamp = 0;
  tags: string[] = [];
  highPriority = false;
}
