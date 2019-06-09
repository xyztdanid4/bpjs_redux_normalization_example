import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'app-page-content',
  templateUrl: './page-content.component.html',
  styleUrls: ['./page-content.component.scss']
})
export class PageContentComponent implements OnInit, OnDestroy {

  private readonly destroy$ = new Subject<void>();
  private readonly ROUTE_DATA_PAGE_TITLE = 'title';
  private readonly rootPageTitle = 'InterTicket';

  pageTitle = '';
  h1 = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.setRoutingDatas();
    this.subscribeToRouterEvents();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private subscribeToRouterEvents(): void {
    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe({
        next: () => this.setRoutingDatas()
      });
  }

  /**
   * Set page title
   *
   * @method setRoutingDatas
   */
  private setRoutingDatas(): void {
    const root: ActivatedRoute = this.activatedRoute.root;

    this.pageTitle = this.getPageTitle(root);
    // Set H1 title
    this.h1 = this.pageTitle;
    // Set browser tab title
    let tabTitle = this.rootPageTitle;
    if (this.pageTitle) {
      const translatedPageTitle: string = this.pageTitle;
      tabTitle = `${translatedPageTitle} | ${this.rootPageTitle}`;
    }
    this.titleService.setTitle(tabTitle);
  }

  /**
   * Returns page title
   * @link https://toddmotto.com/dynamic-page-titles-angular-2-router-events
   *
   * @method getPageTitle
   * @param {ActivateRoute} route
   */
  private getPageTitle(route: ActivatedRoute): string {
    // get the last child
    let newRoute = route;
    while (newRoute.firstChild) {
      const child = newRoute.firstChild;
      if (child.outlet === PRIMARY_OUTLET) {
        newRoute = child;
      }
    }

    if (newRoute.snapshot.data.hasOwnProperty(this.ROUTE_DATA_PAGE_TITLE)) {
      return newRoute.snapshot.data[this.ROUTE_DATA_PAGE_TITLE];
    }
    return '';
  }

}
