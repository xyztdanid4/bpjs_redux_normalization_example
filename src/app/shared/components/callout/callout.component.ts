import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Callout } from '@shared/models/callout/callout.model';

@Component({
  selector: 'app-callout',
  templateUrl: './callout.component.html',
  styleUrls: ['./callout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalloutComponent implements OnInit {

  descriptions: string[];

  @Input() readonly callout: Callout;

  ngOnInit(): void {
    this.descriptions = Array.isArray(this.callout.description) ? this.callout.description : [this.callout.description];
  }

  trackByFn(index: number): number {
    return index;
  }

}
