import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../shared/models/User';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {
  @Input() user;
  person = new User();
  constructor() {
  }

  ngOnInit() {
  }

}
