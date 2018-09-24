import { Directive, ElementRef, OnInit} from '@angular/core';
import * as $ from 'jquery';
import 'bootstrap-daterangepicker';
import * as moment from 'moment';


@Directive({
  selector: '[appDaterangepicker]'
})
export class DaterangepickerDirective implements OnInit {

  constructor(private el: ElementRef) {
  }

  ngOnInit() {

    $(this.el.nativeElement).daterangepicker({
      alwaysShowCalendars: true,
      format: 'M/dd/yyyy',
      separator: ' to ',
      ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'),
          moment().subtract(1, 'month').endOf('month')]
      }
    });
  }

}
