import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss']
})
export class AppRootComponent implements OnInit, OnDestroy {

  private readonly destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private element: ElementRef
  ) { }

  ngOnInit(): void {
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
        next: () => this.element.nativeElement.scrollIntoView()
      });
  }

}
