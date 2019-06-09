import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonIconPosition } from '@shared/enums/button/button-icon-position.enum';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  iconPositions = ButtonIconPosition;

  @Input() readonly type: 'button' | 'submit' = 'button';
  @Input() readonly buttonStyle: 'primary' | 'link' = null;
  @Input() readonly classes: string | string[] = null;
  @Input() readonly isDisabled = false;
  @Input() readonly isLoading = false;
  @Input() readonly icon: string = null;
  @Input() readonly iconPosition: ButtonIconPosition = ButtonIconPosition.BEFORE;
  @Input() readonly label: string = null;
  @Input() readonly isRotated?: boolean = false;

  @Output() onClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  onClickButton(): void {
    this.onClick.emit(true);
  }
}
