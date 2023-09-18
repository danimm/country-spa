import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { debounceTime, Subject, Subscription } from "rxjs";

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debounce = new Subject<string>()
  private debounceSubscription?: Subscription;

  @Input()
  public placeholder: string = ''
  @Input()
  public initialValue: string = ''

  @Output()
  public onValue = new EventEmitter<string>()
  @Output()
  public onDebounce = new EventEmitter<string>()

  ngOnInit(): void {
    this.debounceSubscription = this.debounce
      .pipe(
        debounceTime(500),
      )
      .subscribe( value => {
        this.onDebounce.emit(value)
      })
  }

  ngOnDestroy(): void {
    this.debounceSubscription?.unsubscribe()
  }

  onKeyPress(searchTerm: string) {
    this.debounce.next(searchTerm)
  }
}
