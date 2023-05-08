import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TimerItem } from '../../../services/timers/timer-item.model';
import { FormBuilder, Validators } from '@angular/forms';
import { isNumberValidator } from '../../../share/validators/is-number';

@Component({
  selector: 'app-edit-timer-dialog',
  templateUrl: './edit-timer-dialog.component.html',
  styleUrls: ['./edit-timer-dialog.component.scss'],
})
export class EditTimerDialogComponent implements OnInit {
  isNewTimer = false;

  formGroup = this.formBuilder.group({
    id: [0],
    label: ['', [Validators.required]],
    minutes: [1, [Validators.required, isNumberValidator()]],
    order: [1, [Validators.required, isNumberValidator()]],
  });

  constructor(
    public dialogRef: MatDialogRef<EditTimerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TimerItem | null,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    if (!this.data) {
      this.initNewTask();
    } else {
      this.formGroup.patchValue(this.data);
    }
  }

  cansel(): void {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.formGroup.value);
  }

  private initNewTask() {
    this.isNewTimer = true;

    this.formGroup.patchValue({
      id: Date.now(),
    });
  }
}
