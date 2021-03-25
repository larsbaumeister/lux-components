import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { LuxMediaQueryObserverService } from '../../lux-util/lux-media-query-observer.service';

@Component({
  selector: 'lux-tile',
  templateUrl: './lux-tile.component.html',
  styleUrls: ['./lux-tile.component.scss']
})
export class LuxTileComponent implements OnInit, OnDestroy {
  private static _notificationNewClass = 'lux-notification-new';
  private static _notificationReadClass = 'lux-notification-read';

  @Input() luxLabel: string = undefined;
  @Input() luxTagId: string = undefined;
  @Input() luxShowNotification;
  @Input() luxCounter: number;
  @Input() luxCounterCap = 10;

  @Output() luxClicked: EventEmitter<any> = new EventEmitter<any>();

  mobileView: boolean;
  subscription: Subscription;

  constructor(private queryService: LuxMediaQueryObserverService) {}

  ngOnInit() {
    this.subscription = this.queryService.getMediaQueryChangedAsObservable().subscribe(query => {
      this.mobileView = query === 'xs' ||  query === 'sm';
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  clicked() {
    this.luxClicked.emit();
  }

  getNotificationIconColorClass(): string {
    return this.luxShowNotification === true || this.luxShowNotification === 'true'
      ? LuxTileComponent._notificationNewClass
      : LuxTileComponent._notificationReadClass;
  }
}
