import {Component, OnInit} from '@angular/core';
import {BreadCrumb} from '../../shared/models/breadcrumb';
import {ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})


export class BreadcrumbComponent implements OnInit {
  public breadcrumbs: BreadCrumb[];
  isFront = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.breadcrumbs = [];
  }


  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.isFront = this.router.url === '/';
      this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
      if (this.breadcrumbs.length > 2) {
        this.breadcrumbs = this.breadcrumbs.filter(function (item, i) {
          return i === 1 && item.label === 'Home' ? false : true;
        });
      }

    });
  }


  buildBreadCrumb(route: ActivatedRoute,
                  url: string = '',
                  breadcrumbs: BreadCrumb[] = []): BreadCrumb[] {

    let label;
    let nextUrl;
    let newBreadcrumbs: BreadCrumb[];

    if (route.routeConfig && route.routeConfig.data) {
      if (route.routeConfig.data.hasOwnProperty('breadcrumb')) {
        label = route.routeConfig.data['breadcrumb'];
      } else {
        label = 'Home';
      }
    } else {
      label = 'Home';
    }

    if (label) {
      const path = route.routeConfig ? route.routeConfig.path : '';
      nextUrl = `${url}${path}/`;
      const breadcrumb = {
        label: label,
        url: nextUrl,
        params: []
      };
      newBreadcrumbs = [...breadcrumbs, breadcrumb];
    }
    if (route.firstChild) {
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }


}
