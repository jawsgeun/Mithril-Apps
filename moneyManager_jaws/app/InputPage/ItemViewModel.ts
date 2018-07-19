export default class ItemViewModel {
  private amount: string;
  private moneyPick: string;
  private incomePick: string;
  private detail: string;

  constructor(amount: string, moneyPick: string, incomePick: string, detail: string) {  
    this.amount = amount;
    this.moneyPick = moneyPick;
    this.incomePick = incomePick;
    this.detail = detail
  }

  public getItemData(): Array<string> {
    return [this.amount,this.moneyPick,this.incomePick,this.detail];
  }
}