import {Component} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  showAlert = false;
  alert: any = {};

  constructor(private location: Location, public authService: AuthService, private router: Router) {
  }

  logout() {
    this.authService.logout().subscribe((data: any) => {
      if (data['status'] === 200) {
        localStorage.removeItem('currentUser');
        return this.router.navigate(['/login']);
      } else {
        this.showAlert = true;
        this.alert.type = 'danger';
        this.alert.message = 'failed operation';

        return this.router.navigate(['/login']);
      }
    });
  }

  public switchLanguage(localeId: string): void {
    localStorage.setItem('localeId', localeId);
    // localStorage.removeItem('localeId');
    // console.log(localStorage.getItem('localeId'));
    location.reload(true);
  }


  goBack() {
    this.location.back();
  }


}
