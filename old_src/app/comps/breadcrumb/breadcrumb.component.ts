import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IBreadCrumb } from '../../models/database/IBreadCrumb';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {

  constructor() {
    this.breadcrumbs = this.buildBreadCrumb(this.route.root);
  }

  router = inject(Router);
  route = inject(ActivatedRoute);

  public breadcrumbs: IBreadCrumb[] = [];

  ngOnInit(){
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged()
    ).subscribe(() => this.breadcrumbs = this.buildBreadCrumb(this.route.root));
  }

  buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadCrumb[] = []): IBreadCrumb[] {
    let label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data['title'] : '';
    let path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';

    const lastRoutePart = path?.split('/').pop();
    const isDynamicRoute = lastRoutePart?.startsWith(':');
    if (isDynamicRoute && !!route.snapshot) {
      const paramName = lastRoutePart?.split(':')[1];
      path = path?.replace(lastRoutePart ?? '', route.snapshot.params[paramName?? '']);
      label = route.snapshot.params[paramName ?? ''];
    }

    const nextUrl = path ? `${url}${path}/` : url;

    const breadcrumb: IBreadCrumb = {
      label: label,
      url: nextUrl
    };

    const newBreadcrumbs = breadcrumb.label ? [ ...breadcrumbs, breadcrumb ] : [ ...breadcrumbs ];
    if (route.firstChild) {
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }
}
