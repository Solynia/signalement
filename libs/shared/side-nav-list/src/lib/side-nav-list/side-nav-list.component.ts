import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { defaultArray } from '@signalement/ts-utils';

export type SideNavListItem = { label: string; url: string };

@Component({
  selector: 'sg-side-nav-list',
  imports: [MatListModule, RouterLink, RouterLinkActive],
  templateUrl: './side-nav-list.component.html',
  styleUrl: './side-nav-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavListComponent {
  navItems = input([], { transform: defaultArray<SideNavListItem> });
}
