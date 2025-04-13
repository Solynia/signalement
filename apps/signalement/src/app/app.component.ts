import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { signalementActions } from '@signalement/signalement-store';

@Component({
  imports: [RouterOutlet],
  selector: 'sg-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly store = inject(Store);
  title = 'signalement';

  ngOnInit() {
    this.store.dispatch(signalementActions.initSignalementStore());
  }
}
