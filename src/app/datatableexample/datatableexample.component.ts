import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-datatableexample',
  templateUrl: './datatableexample.component.html',
  styleUrls: ['./datatableexample.component.css']
})
export class DatatableexampleComponent implements OnInit {
  dtOptions: DataTables.Settings = {};

  constructor() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      searching: false
    };
  }


  ngOnInit(): void {

  }

}
