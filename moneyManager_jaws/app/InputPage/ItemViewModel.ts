export default class ItemViewModel {
  private amount: string;
  private moneyPick: string;
  private incomePick: string;
  private detail: string;
  private key: string;

  constructor(key: string, amount: string, moneyPick: string, incomePick: string, detail: string) {
    this.key = key;
    this.amount = amount;
    this.moneyPick = moneyPick;
    this.incomePick = incomePick;
    this.detail = detail
  }

  public getItemData(): Array<string> {
    return [this.key, this.amount, this.moneyPick, this.incomePick, this.detail];
  }
}