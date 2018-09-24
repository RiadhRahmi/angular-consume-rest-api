import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  user: null;
  pagetitle = 'My Profil';
  showAlert = false;
  alert: any = {};

  constructor(private router: Router) {
  }

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      this.user = currentUser;
    } else {
      this.showAlert = true;
      this.alert.type = 'danger';
      this.alert.message = 'failed operation';
      return this.router.navigate(['/login']);

    }

  }

}
