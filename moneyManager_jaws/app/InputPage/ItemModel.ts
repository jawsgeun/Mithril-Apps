export default class ItemModel {
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
    this.detail = detail;
  }
  public isEqual(compare: ItemModel): boolean {
    if (this.key !== compare.getModelKey()) {
      return false;
    } else if (this.amount !== compare.getModelAmount()) {
      return false;
    } else if (this.moneyPick !== compare.getModelMoneyPick()) {
      return false;
    } else if (this.incomePick !== compare.getModelIncomePick()) {
      return false;
    } else if (this.detail !== compare.getModelDetail()) {
      return false;
    } else {
      return true;
    }
  }
  public getModelKey(): string {
    return this.key;
  }
  public getModelAmount(): string {
    return this.amount;
  }
  public getModelMoneyPick(): string {
    return this.moneyPick;
  }
  public getModelIncomePick(): string {
    return this.incomePick;
  }
  public getModelDetail(): string {
    return this.detail;
  }
}
