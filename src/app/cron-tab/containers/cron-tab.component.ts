import { Component, EventEmitter, NgZone, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cron-tab',
  templateUrl: './cron-tab.component.html',
  styleUrls: [ './cron-tab.component.scss' ]
})
export class CronTabComponent implements OnInit {
  listMinuti: Array<number> = [];
  listOre: Array<number> = [];
  listGiorni: Array<number> = [];
  form: FormGroup;
  isRange = false;
  isRangeHours = false;
  isRangeDays = false;
  isRangeMonths = false;
  isRangeWeek = false;
  @Output() cronTab = new EventEmitter<string>();
  constructor(
    private zone: NgZone,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.initForm();
    this.zone.runOutsideAngular(() => {
      for (let i = 0; i < 60; i++) {
        setTimeout(() => this.listMinuti.push(i));
      }
      this.zone.run(() => {
        setTimeout(() => this.listMinuti, 1000);
      });
    });
    this.zone.runOutsideAngular(() => {
      for (let i = 0; i < 24; i++) {
        setTimeout(() => this.listOre.push(i));
      }
      this.zone.run(() => {
        setTimeout(() => this.listOre, 1000);
      });
    });
    this.zone.runOutsideAngular(() => {
      for (let i = 1; i < 32; i++) {
        setTimeout(() => this.listGiorni.push(i));
      }
      this.zone.run(() => {
        setTimeout(() => this.listGiorni = this.listGiorni, 1000);
      });
    });
  }


  initForm() {
    this.form = this.fb.group({
      minutes: this.fb.group({
        min: '*',
        range: ''
      }),
      hours: this.fb.group({
        hours: '*',
        range: ''
      }),
      days: this.fb.group({
        days: '*',
        range: ''
      }),
      months: this.fb.group({
        months: '*',
        range: ''
      }),
      weekday: this.fb.group({
        weekday: '*',
        range: ''
      }),
    });
  }


  // onMinutiRange() {
  //   this.form.get('minutes').patchValue({
  //     min: this.form.get('minutes').get('range').value.toString(),
  //   });
  //   this.isRange = true;
  // }
  //
  // onMinutiRadio() {
  //   this.isRange = false;
  //   this.form.get('minutes').patchValue({
  //     range: ''
  //   });
  // }


  onHoursRange() {
    this.form.get('hours').patchValue({
      hours: this.form.get('hours').get('range').value.toString(),
    });
    this.isRangeHours = true;
  }

  onHoursRadio() {
    this.isRangeHours = false;
    this.form.get('hours').patchValue({
      range: ''
    });
  }

  onDaysRange() {
    this.form.get('days').patchValue({
      days: this.form.get('days').get('range').value.toString(),
    });
    this.isRangeDays = true;
  }

  onDaysRadio() {
    this.isRangeDays = false;
    this.form.get('days').patchValue({
      range: ''
    });
  }

  onMonthsRange() {
    this.form.get('months').patchValue({
      months: this.form.get('months').get('range').value.toString(),
    });
    this.isRangeMonths = true;
  }

  onMonthsRadio() {
    this.isRangeMonths = false;
    this.form.get('months').patchValue({
      range: ''
    });
  }


  onWeekRange() {
    this.form.get('weekday').patchValue({
      weekday: this.form.get('weekday').get('range').value.toString(),
    });
    this.isRangeWeek = true;
  }

  onWeekRadio() {
    this.isRangeWeek = false;
    this.form.get('weekday').patchValue({
      range: ''
    });
  }

  onClick() {
    const cron =
      this.form.get('minutes').get('min').value + ' '
      + this.form.get('hours').get('hours').value + ' '
      + this.form.get('days').get('days').value + ' '
      + this.form.get('months').get('months').value + ' '
      + this.form.get('weekday').get('weekday').value;
    this.cronTab.emit(cron);
  }

}