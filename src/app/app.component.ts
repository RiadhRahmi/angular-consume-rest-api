import {Component, OnInit} from '@angular/core';
import {AuthService} from './shared/services/auth.service';
import {BreadcrumbsService} from 'ng6-breadcrumbs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {


  constructor(private breadcrumbsService: BreadcrumbsService, public authService: AuthService) {
  }

  ngOnInit(): void {
    this.breadcrumbsService.storePrefixed({label: 'Home', url: '/', params: []});
  }

}
