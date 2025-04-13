import { MediaMatcher } from '@angular/cdk/layout';
import { UpperCasePipe } from '@angular/common';
import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  SideNavListComponent,
  SideNavListItem,
} from '@signalement/side-nav-list';
import { signalementActions } from '@signalement/signalement-store';

const navItems: SideNavListItem[] = [
  { label: 'Signalements', url: 'signalements' },
  { label: 'Auteurs', url: 'authors' },
];

@Component({
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    SideNavListComponent,
    UpperCasePipe,
  ],
  selector: 'sg-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);
  private readonly media = inject(MediaMatcher);
  private readonly mobileQuery = this.media.matchMedia('(max-width: 600px)');
  private readonly mobileQueryListener = () =>
    this.isMobile.set(this.mobileQuery.matches);

  readonly title = 'signalement';
  readonly navItems = navItems;
  readonly isMobile = signal(this.mobileQuery.matches);

  readonly marginTop = computed(() => (this.isMobile() ? '56' : '0'));
  readonly sideNavOpened = computed(() => (this.isMobile() ? false : true));
  readonly sideNavMode = computed(() => (this.isMobile() ? 'over' : 'side'));

  constructor() {
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  ngOnInit() {
    this.store.dispatch(signalementActions.initSignalementStore());
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }
}
