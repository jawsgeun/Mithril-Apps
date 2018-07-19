import * as m from 'mithril'
import SelectView from './SelectView'
import './Input.css'
import ItemListView from './ItemListView'
import ItemViewModel from './ItemViewModel'

class Input implements m.ClassComponent<{}>{
  private amount: string = '';
  private moneyPick: string = '';
  private incomePick: string = '';
  private detail: string = '';
  private itemList: Array<ItemViewModel>;
  private year: string;
  private month: string;
  private day: string;
  private testData: Array<Array<string>> = [
    ['3000원', '현금', '수입', 'test1'],
    ['4000원', '현금', '지출', 'test2'],
    ['5000원', '카드', '수입', 'test3'],
  ]

  public oninit(vnode) {
    this.year = new Date().getFullYear().toString();
    this.month = (new Date().getMonth() + 1).toString();
    this.day = new Date().getDate().toString();
    this.itemList = this.testData.map((v: Array<string>) => {
      return new ItemViewModel(v[0], v[1], v[2], v[3]);
    })
  }
  public onSubmit = () => {
    if (this.checkEmpty()) {
      this.itemList.push(new ItemViewModel(this.amount, this.moneyPick, this.incomePick, this.detail))
      alert('완료되었습니다.')
      localStorage[this.year + '.' + this.month + '.' + this.day] = JSON.stringify(this.itemList);
    }
  }
  public checkEmpty(): boolean {
    if (this.amount == '') {
      alert('금액을 입력하세요!')
    } else if (this.incomePick == '') {
      alert('수입과 지출 중 한 가지를 선택하세요!')
    } else if (this.moneyPick == '') {
      alert('카드와 현금 중 한 가지를 선택하세요!')
    } else if (this.detail == '') {
      alert('상세 정보를 입력하세요!')
    } else {
      return true;
    }
    return false;
  }
  private onAmountChange = (amount: string): void => {
    this.amount = amount;
  }
  private onDetailChange = (detail: string): void => {
    this.detail = detail;
  }
  private onMoneyRadioClick = (choice: string) => {
    this.moneyPick = choice;
  }
  private onIncomeRadioClick = (choice: string) => {
    this.incomePick = choice;
  }
  private setYear = (year: string): void => {
    this.year = year;
  }
  private setMonth = (month: string): void => {
    this.month = month;
  }
  private setDay = (day: string): void => {
    this.day = day;
  }
  private listUp = (): void => {
    this.itemList = JSON.parse(localStorage.getItem(this.year + '.' + this.month + '.' + this.day));
  }
  public view(vnode) {
    return (
      <div className='docs-example'>
        <h1>
          <input type='number' className='date_input' id='date_year' value={this.year} oninput={m.withAttr('value', this.setYear)} />년
          <input type='number' className='date_input' id='date_month' value={this.month} oninput={m.withAttr('value', this.setMonth)} />월
          <input type='number' className='date_input' id='date_day' value={this.day} oninput={m.withAttr('value', this.setDay)} />일
          &nbsp;&nbsp;
          <button onclick={this.listUp}>내역 조회</button>
        </h1>
        <input type='number' id='input_amount' className='money_input'
          oninput={m.withAttr('value', this.onAmountChange)} placeholder='금액을 입력하세요' />&nbsp;원
        <SelectView formTitle='카드/현금 선택' subTitle={['카드', '현금']} ids={['credit', 'cash']} onClickEvent={this.onMoneyRadioClick} />
        <hr />
        <SelectView formTitle='수입/지출 선택' subTitle={['수입', '지출']} ids={['income', 'outcome']} onClickEvent={this.onIncomeRadioClick} />
        <h2>상세 정보 입력</h2>
        <textarea rows="3" cols="50" id='input_detail'
          oninput={m.withAttr('value', this.onDetailChange)} placeholder='상세정보를 입력하세요.' />
        <ItemListView itemList={this.itemList} />
        <button onclick={this.onSubmit}>등록 하기</button>
      </div>
    )
  }
}

export default Input;