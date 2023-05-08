export class TimerItem {
  id: number;
  label: string;
  minutes: number;
  order: number;
  startTimeStamp? :number;
  endTimeStamp?: number;

  constructor(id: number, label: string, minutes: number, order: number) {
    this.id = id;
    this.label = label;
    this.minutes = minutes;
    this.order = order;
  }
}
