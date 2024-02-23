export interface TimerCardData {
  milliseconds: number;
  actionButtons: number[];
  buttonTitle: string;
}

export class NewTimerCard implements TimerCardData {
  milliseconds: number;
  actionButtons: number[];
  buttonTitle: string;

  constructor() {
    this.milliseconds = 60;
    this.actionButtons = [-30, 30, 60];
    this.buttonTitle = "";
  }
}
